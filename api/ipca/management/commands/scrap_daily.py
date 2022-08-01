"""
Módulo para baixar todos os dados de IPCA da API do BCB até junho de 2022,
carregar os dados baixados no banco de dados e salvar um arquivo .csv localmente
como cópia.
"""

from datetime import datetime
from typing import List
from typing import TypedDict
import requests

from django.core.management.base import BaseCommand

from ipca.models import IpcaData
from ipca.utils.lib import str_to_date
from ipca.utils.lib import str_to_decimal


API_URL = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.433/dados"


class ResponseItem(TypedDict):
    data: str
    valor: str


def get_data(url: str) -> List[ResponseItem]:
    res = requests.get(url)
    try:
        data = res.json()
    except:
        # TODO: log errors
        data = []
    return data


class Command(BaseCommand):
    def handle(self, *args, **options):
        today = datetime.today().strftime("%d/%m/%Y")
        url = API_URL + f"?dataInicial={today}&dataFinal={today}"
        ipca_data = get_data(url)
        last_ipca_data = IpcaData.objects.latest("id")
        last_date = last_ipca_data.data
        for item in ipca_data:
            date = str_to_date(item["data"])
            value = str_to_decimal(item["valor"])
            if date is not None and value is not None and date > last_date:
                new_data = IpcaData(data=date, valor=value)
                new_data.save()
