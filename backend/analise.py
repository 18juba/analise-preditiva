import joblib
import numpy as np
from tensorflow.keras.preprocessing import image

# Carrega modelo e scaler
model = joblib.load('./modelo/modelo.pkl')
scaler = joblib.load('./modelo/scaler.pkl')

def preprocessar_imagem(image_bytes):
    img_array = np.frombuffer(image_bytes, np.uint8)
    
    from PIL import Image
    import io
    img = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    
    img = img.resize((64, 64))
    
    img_array = np.array(img) / 255.0
    
    img_array = img_array.flatten()
    
    img_array = scaler.transform([img_array])
    
    return img_array

def analisar(image_bytes):
    imagem = preprocessar_imagem(image_bytes)
    
    classe = model.predict(imagem)[0]
    probabilidades = model.predict_proba(imagem)[0]
    
    idx_classe = list(model.classes_).index(classe)
    certeza = float(probabilidades[idx_classe])
    
    return classe, certeza
