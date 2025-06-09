from fastapi import FastAPI
from models import Pedido
from services import CheckFraudService
app = FastAPI()

service = CheckFraudService()

@app.post('/fraud-test')
async def check_fraud(pedido: Pedido):
    resultado = await service.execute(pedido)
    return {"resultado": resultado}