# Acidentes de trânsito com Naive Bayes

## Objetivo
O objetivo desse trabalho é construir uma aplicação web que seja capaz de determinar com base numa imagem se houve um acidente grave, moderedo ou se não ocorreu acidente através do agoritmo de machine learnig Naive Bayes.

---

## Equipe e funções
- Charles Lima -> Treinamento do Modelo
- André Lucas -> Front-End
- José Lucas -> Back-End
- Paulo Vinícius -> Construção do dataset
- Conrado Einstein -> Back-End

---

## Organização do Trabalho

```
backend
|--modelo/
    |--modelo.pkl
    |--scaler.pkl

frontend/

naive_bayes/
|--dataset/
|    |--DatasetRaw/
|        |--Acidentes/ #pasta com imagens utilizadas para treino e testes
|--Trabalho_Probest_Acidentes.ipynb #notebook com o treinamento do modelo 

slides/ #pasta contendo os slides
```