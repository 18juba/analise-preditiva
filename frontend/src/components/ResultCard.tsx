import '../styles/ResultCard.css';
import { CLASS_CONFIG } from '../services/classConfig';

interface Props {
  result: number;
}

export function ResultCard({ result }: Props) {
  const config = CLASS_CONFIG[result];

  if (!config) {
    return (
      <div className="result-card result-card--safe">
        <h3>Resultado desconhecido</h3>
      </div>
    );
  }

  return (
    <div className={`result-card ${config.modifier}`}>
      <h3>{config.label}</h3>
      <p>{config.message}</p>
    </div>
  );
}
