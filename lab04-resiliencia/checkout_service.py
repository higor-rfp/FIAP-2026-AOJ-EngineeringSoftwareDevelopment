# import time
import requests
from tenacity import retry, stop_after_attempt, wait_fixed


# Função de Fallback (Socorro)
def fallback_seguro(retry_state):
    print("!!! ALERTA: Anti-Fraude instável. Acionando Fallback de Segurança !!!")
    return {
        "status": "ANALISE_MANUAL",
        "codigo": 202,
        "mensagem": "Pagamento recebido. Aguarde análise manual devido à instabilidade técnica.",
    }


class CheckoutService:
    def __init__(self, antifraude_url="http://localhost:8080/v1/validar"):
        self.antifraude_url = antifraude_url

    # def processar_pagamento(self, transacao):
    #    """
    #    LAB 04: CÓDIGO VULNERÁVEL
    #    Atualmente, este método não possui proteção contra latência de rede.
    #    Se o serviço de Anti-Fraude demorar, esta thread ficará travada.
    #    """
    #    try:
    #        # O aluno verá que este requests sem timeout adequado é o culpado
    #        response = requests.get(self.antifraude_url, timeout=30)
    #        return response.json()
    #    except Exception as e:
    #        print(f"Erro na transação: {e}")
    #        raise e

    @retry(
        stop=stop_after_attempt(3),  # Tenta apenas 3 vezes
        wait=wait_fixed(0.1),  # Espera só 100ms entre elas
        retry_error_callback=fallback_seguro,  # Se falhar tudo, chama o socorro
    )
    def processar_pagamento(self, transacao):
        # IMPORTANTE: Reduza o timeout para 0.5s para forçar a falha rápida!
        response = requests.get(self.antifraude_url, timeout=0.5)
        return response.json()
