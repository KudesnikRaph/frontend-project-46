import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

export default (filePath) => {
  const fileExt = path.extname(filePath);
  if (fileExt === '.yml' || fileExt === '.yaml') {
    return yaml.load(fs.readFileSync(filePath, 'utf-8'));
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};
