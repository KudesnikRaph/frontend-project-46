#!/usr/bin/env node
/* eslint-disable no-unused-vars */
/* eslint-disable no-return-assign */
// eslint-disable-next-line import/no-unresolved
import _ from 'lodash';
import parse from './parsers.js';
// eslint-disable-next-line import/no-unresolved
import stylishDiff from './stylish.js';

const stringify = (value, replacer = ' ', spacesCount = 2) => {
  const iteration = (el, counter) => {
    const array = Object.entries(el).map(([key, val]) => {
      if (typeof val === 'object' && val) return (`${replacer.repeat(counter)}${key}: ${iteration(val, counter + spacesCount)}`);
      return (`${replacer.repeat(counter)}${key}: ${val}`);
    });
    const output = array.join('\n');
    return counter === spacesCount ? `{\n${output}\n}` : `{\n${output}\n${replacer.repeat(counter - spacesCount)}}`;
  };
  return typeof value !== 'object' ? `${value}` : iteration(value, spacesCount);
};

// Чтение содержимого файлов
const gendiff = (file1, file2) => {
  const output = {};
  // читает два файла в формате
  const value1 = parse(file1);
  const value2 = parse(file2);

  // Получение списка ключей из двух объектов
  const row1 = Object.keys(value1);
  const row2 = Object.keys(value2);
  const sortedUnionRows = _.sortBy(_.union(row1, row2), (k) => k);
  // console.log(sortedUnionRows);
  // Обработка каждого ключа
  sortedUnionRows.forEach((key) => {
    const keyValue1 = value1[key];
    const keyValue2 = value2[key];
    if (keyValue1 === keyValue2) output[`${key}`] = keyValue1;
    if (row1.includes(key) && !row2.includes(key)) output[`- ${key}`] = keyValue1;
    if (!row1.includes(key) && row2.includes(key)) output[`+ ${key}`] = keyValue2;
    if (row1.includes(key) && row2.includes(key) && keyValue1 !== keyValue2) {
      output[`- ${key}`] = keyValue1; // значение из первого объекта
      output[`+ ${key}`] = keyValue2; // значение из второго объекта
    }
  });
  return (stringify(output));
};
export default gendiff;
