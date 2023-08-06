import _ from 'lodash';
import { plainObj } from '../treeBuilder.js';

const commonStringify = (value, replacer = ' ', spacesCount = 1) => {
  const iter = (el, counter) => {
    const arr = Object.entries(el).map(([key, val]) => {
      if (typeof val === 'object' && val) return (`${replacer.repeat(counter)}${key}: ${iter(val, counter + spacesCount)}`);
      return (`${replacer.repeat(counter)}${key}: ${val}`);
    });
    const result = arr.join('\n');
    return counter === spacesCount ? `{\n${result}\n}` : `{\n${result}\n${replacer.repeat(counter - spacesCount)}}`;
  };
  return typeof value !== 'object' ? `${value}` : iter(value, spacesCount);
};

const indent = (depth, spacesCount = 4) => ' '.repeat((depth * spacesCount) - 2);

const isBracketIndent = (depth, spacesCount = 4) => ' '.repeat((depth * spacesCount) - spacesCount);

export const stringify = (value) => {
  if (plainObj(value)) return commonStringify(value);

  const iter = (currentValue, depth = 1) => {
    if (!_.isObject(currentValue)) return `${currentValue}`;

    const depthIndent = indent(depth);
    const bracketIndent = isBracketIndent(depth);
    const strings = Object
      .entries(currentValue)
      .map(([key, val]) => {
        const keyElement = key[0];
        if (keyElement === '+' || keyElement === '-') return `${depthIndent}${key}: ${iter(val, depth + 1)}`;
        return `${depthIndent}  ${key}: ${iter(val, depth + 1)}`;
      });

    return [
      '{',
      ...strings,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value);
};

export default stringify;
