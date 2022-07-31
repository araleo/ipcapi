from datetime import date
from decimal import Decimal

from django.test import TestCase

from ipca.utils.lib import *


class LibTests(TestCase):

    def test_str_to_date_returns_date(self):
        res = str_to_date('01/01/1980')
        _date = date.fromisoformat('1980-01-01')
        self.assertEqual(res, _date)
        res = str_to_date('01/12/1980')
        _date = date.fromisoformat('1980-12-01')
        self.assertEqual(res, _date)
        res = str_to_date('12/01/1980')
        _date = date.fromisoformat('1980-01-12')
        self.assertEqual(res, _date)

    def test_str_to_date_returns_None_on_failure(self):
        res = str_to_date('test')
        self.assertIsNone(res)
        res = str_to_date('01/13/1980')
        self.assertIsNone(res)
        res = str_to_date('32/01/1980')
        self.assertIsNone(res)
        res = str_to_date('')
        self.assertIsNone(res)

    def test_str_to_decimal_returns_Decimal(self):
        res = str_to_decimal('10')
        is_decimal = isinstance(res, Decimal)
        self.assertTrue(is_decimal)
        res = str_to_decimal('0.5')
        is_decimal = isinstance(res, Decimal)
        self.assertTrue(is_decimal)
        res = str_to_decimal('-2.5')
        is_decimal = isinstance(res, Decimal)
        self.assertTrue(is_decimal)

    def test_str_to_decimal_returns_None_on_failure(self):
        res = str_to_decimal('test')
        self.assertIsNone(res)
        res = str_to_decimal('')
        self.assertIsNone(res)
