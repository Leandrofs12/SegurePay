from pydantic import BaseModel

class Pedido(BaseModel):
    idade: int
    CPF: str
    produto: str
    valor: float
    cidade: str
    hora: int
    quantidade: int
    entrega_local: str
    local_entrega_diferente: int = 0
    comprou_anteriormente: int

    def defini_distancia(self):
        if(self.cidade == self.entrega_local):
            self.local_entrega_diferente = 0
        else:
            self.local_entrega_diferente = 1