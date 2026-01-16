export interface Coordinates {
  latitude: number;
  longitude: number;
}

export function getLocation(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocalização não suportada pelo navegador"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Usuário negou permissão de localização"));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Localização indisponível"));
            break;
          case error.TIMEOUT:
            reject(new Error("Tempo de requisição de localização expirou"));
            break;
          default:
            reject(new Error("Erro desconhecido ao obter localização"));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}
