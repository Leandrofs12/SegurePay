from pathlib import Path
from typing import Any

import joblib
import pandas as pd
import json

from models import Pedido

BASE_PATH = Path(__file__).parent


class CheckFraudService:
    def __load_model_and_preprocessor(self) -> tuple[Any, Any]:
        model = joblib.load(f"{BASE_PATH}/ml_model/model.pkl")
        preprocessor = joblib.load(f"{BASE_PATH}/ml_model/preprocesser.pkl")
        return model, preprocessor

    async def execute(self, pedido: Pedido) -> bool:
        # Carregando o modelo e o pipeline de pré-processamento
        model, preprocessor = self.__load_model_and_preprocessor()

        pedido.defini_distancia()
        pedido_dict = pedido.model_dump()
        # Convertendo para DataFrame e aplicando pré-processamento
        df_pedido = pd.DataFrame([pedido_dict])
        X_pedido = preprocessor.transform(df_pedido)

        # Fazendo a previsão
        prediction = model.predict(X_pedido)[0]

        # Interpretando a previsão
        result = True if prediction == 1 else False

        return result