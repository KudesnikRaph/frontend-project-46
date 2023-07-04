#!/usr/bin/env node
import * as fs from "node: fs";
import _ from "lodash";

const stringify = (value, replacer = ' ', spacesCount = 1) => {
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

const gendiff = (filepath1, filepath2) => {
  const output = {};
  const value1 = JSON.parse(fs.readFileSync(filepath1, 'utf8'));
  const value2 = JSON.parse(fs.readFileSync(filepath2, 'utf8'));
  const row1 = Object.keys(value1);
  const row2 = Object.keys(value2);
  const sortedUnionRows = _.sortBy(_.union(row1, row2), (k) => k);
  sortedUnionRows.forEach((key) => {
    const val1 = value1[key];
    const val2 = value2[key];
    if (val1 === val2) output[`  ${key}`] = val1;
    if (row1.includes(key) && !row2.includes(key)) output[`- ${key}`] = val1;
    if (!row1.includes(key) && row2.includes(key)) output[`+ ${key}`] = val2;
    if (row1.includes(key) && row2.includes(key) && val1 !== val2) {
      output[`- ${key}`] = val1;
      output[`+ ${key}`] = val2;
    }
  });
  console.log(stringify(output));
  JSON.parse(gendiff)
};
export default gendiff;