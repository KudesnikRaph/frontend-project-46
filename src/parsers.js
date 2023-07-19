/* eslint-disable no-unused-vars */
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export default (pathToFile) => {
  const fileExt = path.extname(pathToFile);
  if (fileExt === '.yml' || fileExt === '.yaml') {
    return yaml.load(fs.readFileSync(pathToFile, 'utf-8'));
  }
  return JSON.parse(fs.readFileSync(pathToFile, 'utf-8'));
};
