import joblib
import numpy as np
import cv2

model = joblib.load('./modelo/modelo_treinado.pkl')

def preprocessar_imagem(image_bytes):
    img_array = np.frombuffer(image_bytes, np.uint8)

    imagem = cv2.imdecode(img_array, cv2.IMREAD_GRAYSCALE)

    # redimensiona (exemplo)
    imagem = cv2.resize(imagem, (64, 64))

    # normaliza (se você fez isso no treino)
    imagem = imagem / 255.0

    # achata para vetor
    imagem = imagem.flatten()

    # formato (1, n_features)
    return imagem.reshape(1, -1)


def analisar(image_bytes):
    imagem = preprocessar_imagem(image_bytes)

    classe = model.predict(imagem)[0]
    probabilidades = model.predict_proba(imagem)[0]

    certeza = float(probabilidades[classe])

    return int(classe), certeza
