import {
  getEarliestDate,
  getOneYearBefore,
  getOneYearLater,
} from '../../utils/lib';

describe('Lib tests', () => {
  test('getEarliestDate', () => {
    const res = getEarliestDate();
    expect(res).toEqual(new Date(1980, 0, 1));
  });

  test('getOneYearBefore returns date one year before parameter', () => {
    const _date = new Date(2022, 0, 1);
    const lastYear = new Date(2021, 1, 1);
    const res = getOneYearBefore(_date);
    expect(res).toEqual(lastYear);
  });

  test('getOneYearBefore returns date one year before current date', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 0, 1));
    const lastYear = new Date(2021, 1, 1);
    const res = getOneYearBefore();
    expect(res).toEqual(lastYear);
  });

  test('getOneYearLater retuns date one year after parameter', () => {
    const _date = new Date(2022, 0, 1);
    const nextYear = new Date(2023, 0, 1);
    const res = getOneYearLater(_date);
    expect(res).toEqual(nextYear);
  });

  test('getOneYearLater retuns date one year after current date', () => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 0, 1));
    const nextYear = new Date(2023, 0, 1);
    const res = getOneYearLater();
    expect(res).toEqual(nextYear);
  });
});
