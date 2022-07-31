from datetime import date

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.status import *
from rest_framework.views import APIView

from .models import IpcaData
from .serializers import IpcaDataSerializer
from .utils.constants import MESSAGES
from .utils.lib import get_date_from_request, str_to_decimal


def bad_request_response(message: str):
    res = {"error": message}
    return Response(data=res, status=HTTP_400_BAD_REQUEST)


class IpcaDataList(APIView):

    def get(self, request: Request):
        queryset = IpcaData.objects.all()
        serializer = IpcaDataSerializer(queryset, many=True)
        return Response(data=serializer.data, status=HTTP_200_OK)

    def post(self, request: Request):
        start = get_date_from_request(request.data.get('start', ''))
        end = get_date_from_request(request.data.get('end', ''))

        if start is None or end is None:
            return bad_request_response(MESSAGES["NON_NULL_DATES"])

        if start < date(1980, 1, 1):
            return bad_request_response(MESSAGES["NO_DATE_BEFORE_BEGIN"])

        if end > date.today():
            return bad_request_response(MESSAGES["NO_DATE_AFTER_TODAY"])

        dates_delta = end - start
        if dates_delta.days < 0:
            return bad_request_response(MESSAGES["NO_END_BEFORE_START"])

        if dates_delta.days > 366:
            return bad_request_response(MESSAGES["MAX_INTERVAL_LIMIT"])

        queryset = IpcaData.objects.filter(data__range=[start, end])
        serializer = IpcaDataSerializer(queryset, many=True)
        period_sum = sum([str_to_decimal(ipca["valor"]) for ipca in serializer.data])
        data = {"soma": period_sum, "data": serializer.data}

        format = request.query_params.get("format", "json")
        if format == "xlsx":
            print("EXCEL")
        print("JSON")
        return Response(data=data, status=HTTP_200_OK)
