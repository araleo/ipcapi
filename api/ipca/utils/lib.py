from typing import List, Optional
from datetime import date, datetime
from decimal import Decimal, InvalidOperation
import io

from django.http import HttpResponse
import bleach
import xlsxwriter


def str_to_date(date_str: str) -> Optional[date]:
    try:
        _date = datetime.strptime(date_str, "%d/%m/%Y")
        return _date.date()
    except ValueError:
        # TODO: log errors
        return None


def get_date_from_request(request_data: str) -> Optional[date]:
    _date = bleach.clean(request_data, strip=True)
    _date = str_to_date(_date)
    return _date


def str_to_decimal(value: str) -> Optional[Decimal]:
    try:
        dec = Decimal(value)
        return dec
    except InvalidOperation:
        # TODO: log errors
        return None


def excel_response(data: List) -> HttpResponse:
    output = io.BytesIO()
    workbook = xlsxwriter.Workbook(output , {"in_memory": True})
    worksheet = workbook.add_worksheet()
    for row_num, columns in enumerate(data):
        for col_num, cell_data in enumerate(columns):
            worksheet.write(row_num, col_num, cell_data)
    workbook.close()
    output.seek(0)
    filename = "ipca.xlsx"
    content_type = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    headers = {"Content-Disposition": f"attachment; filename={filename}"}
    response = HttpResponse(output, content_type=content_type, headers=headers)
    return response


if __name__ == "__main__":
    pass
