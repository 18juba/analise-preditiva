import { useEffect, useRef, useState } from "react";
import { ImageUploader } from "../components/ImageUploader";
import { ResultCard } from "../components/ResultCard";
import { analyzeImage } from "../services/api";
import "../styles/Home.css";
import { CLASS_MAP } from "../services/classes";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getLocation } from "../services/location";

export function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [confianca, setConfianca] = useState<number | null>(null);
  const [uploaderKey, setUploaderKey] = useState(0);

  const mapRef = useRef<L.Map | null>(null);

  const handlePredict = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await analyzeImage(file);
      setResult(response.classe);
      setConfianca(response.certeza);
    } catch (error) {
      alert("Erro ao analisar imagem. Verifique o console.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  function clean() {
    setResult(null);
    setFile(null);
    setUploaderKey((prev) => prev + 1);

    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }
  }

  /**
   * Cria o mapa quando o resultado existir
   */
  useEffect(() => {
    if (!result || mapRef.current) return;

    async function initMap() {
      try {
        const coords = await getLocation();

        const map = L.map("map").setView(
          [coords.latitude, coords.longitude],
          15
        );

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        L.marker([coords.latitude, coords.longitude])
          .addTo(map)
          .bindPopup("📍 Você está aqui")
          .openPopup();

        mapRef.current = map;
      } catch (err) {
        console.error("Erro ao obter localização:", err);
        alert("Não foi possível obter sua localização.");
      }
    }

    initMap();
  }, [result]);

  return (
    <div className="container">
      <header className="home-header">
        <h1>🚦 Detector de Acidentes</h1>
        <p className="home-subtitle">Envie uma imagem para análise</p>
      </header>

      <div className="home-card">
        <ImageUploader key={uploaderKey} onImageSelected={setFile} />

        {file && (
          <div className="predict-buttons">
            {result && (
              <button className="btn btn-primary" onClick={clean}>
                🔃 Analisar Outra Imagem
              </button>
            )}

            <button
              className="btn btn-primary"
              onClick={handlePredict}
              disabled={loading}
            >
              {loading ? "Analisando..." : "🔍 Realizar Previsão"}
            </button>
          </div>
        )}

        {result && (
          <>
            <ResultCard result={result} confianca={confianca} />

            <div
              id="map"
              style={{
                width: "100%",
                height: "400px",
                marginTop: "16px",
                borderRadius: "8px",
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
