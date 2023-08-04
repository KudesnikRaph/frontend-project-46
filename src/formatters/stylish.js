/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
import _ from 'lodash';
// import { log } from 'make';

// export default stylishDiff = (key, value, depth) => {
//   if (!_.Object(value)) {
//     return `${key}: ${value}`;
//   }
//   const indent = ' '.repeat(depth);
//   const indentMinus = ' '.repeat(depth - 1);
//   const string = Object.entries(value).flatMap(([key, ent]) => ` ${stylish(key, ent, indent + 2)}`);

//   return `${key}: {\n${indent}${string.join(`\n${indent}`)}}`
// }

const BASE_INDENT = 2;

const renderWhitespaces = (amount) => {
  let result = ''
  for (0; amount--; amount) {
    result = result + ' '
  }
  return result
}

const a = {"a": 2,
"b": 4,"c": {"d": 4,"e": 5}}

const style = (json, depth) => {
  console.log("{")
  console.log(Object.entries(json).forEach(([key, value]) => {
    let indent = BASE_INDENT;
    indent = typeof value === 'object' ? indent * depth : indent;
    console.log(`${' '.repeat(indent)}${key}: ${value},`)
  }))
  console.log("}\n")
}

style(a, 1);