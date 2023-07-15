/* eslint-disable max-len */
// Импортируем модуль для тестирования
// eslint-disable-next-line import/no-extraneous-dependencies
import { test, expect } from '@jest/globals';
// Импортируем функцию gendiff из вашего кода
import gendiff from '../src/index.js';
// Определяем пути к файлам с данными
const file1 = './bin/file1.json';
const file2 = './bin/file2.json';
// Определяем ожидаемый результат сравнения
const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
// Написываем тест, который вызывает функцию gendiff с файлами и сравнивает ее вывод с ожидаемым результатом
test('gendiff compares flat json files correctly', () => {
  expect(gendiff(file1, file2)).toEqual(expected);
});
