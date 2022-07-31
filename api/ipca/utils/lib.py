from datetime import date, datetime
from decimal import Decimal, InvalidOperation
from typing import Optional

import bleach


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


if __name__ == "__main__":
    pass
