import { buildTree } from './treeBuilder.js';
import parse from './parsers.js';
import format from './formatters/index.js';

const genDiff = (file1, file2, formatName = 'stylish') => {
  const data1 = parse(file1);
  const data2 = parse(file2);
  const formats = format(formatName)(buildTree(data1, data2));
  return formats;
};
export default genDiff;
