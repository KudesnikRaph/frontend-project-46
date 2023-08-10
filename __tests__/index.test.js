/* eslint-disable eol-last */
/* eslint-disable padded-blocks */
/* eslint-disable no-underscore-dangle */
import * as path from 'path';
import { fileURLToPath } from 'url';
// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, test, expect } from '@jest/globals';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '.', '__fixtures__', filename);

describe('basic', () => {
  const expected = '{\n - follow: false\n   host: hexlet.io\n - proxy: 123.234.53.22\n - timeout: 50\n + timeout: 20\n + verbose: true\n}';

  test('json type', () => {
    const file1json = 'file1.json';
    const file2json = 'file2.json';
    expect(gendiff(getFixturePath(file1json), getFixturePath(file2json))).toEqual(expected);
  });

  test('yaml type', () => {
    const file1yml = 'file1.yml';
    const file2yml = 'file2.yml';
    expect(gendiff(getFixturePath(file1yml), getFixturePath(file2yml))).toEqual(expected);
  });
});

describe('trees', () => {
  const result = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  test('json type', () => {
    const tree1json = 'tree1.json';
    const tree2json = 'tree2.json';
    expect(gendiff(getFixturePath(tree1json), getFixturePath(tree2json))).toEqual(result);
  });

  test('yaml type', () => {
    const tree1yml = 'tree1.yml';
    const tree2yml = 'tree2.yml';
    expect(gendiff(getFixturePath(tree1yml), getFixturePath(tree2yml))).toEqual(result);
  });
});

describe('plain formatters', () => {
  const plainResult = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

  test('plain', () => {
    const plainFile1 = 'tree1.json';
    const plainFile2 = 'tree2.json';
    expect(gendiff(getFixturePath(plainFile1), getFixturePath(plainFile2), 'plain')).toEqual(plainResult);
  });
});