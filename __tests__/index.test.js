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
  const expected = `{
  - follow: false
  host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

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
