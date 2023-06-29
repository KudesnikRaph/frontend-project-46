#!/usr/bin/env node
import * as fs from "node: fs";
import _ from "lodash";
import path from 'path'; 

const buildPath = (filepath) => path.resolve(process.cwd(), filepath);
const format = (filepath) => path.extname(filepath).slice(1);
const data = (filepath) => parse(fs.readFileSync(filepath, 'utf-8'), format(filepath));


function genDiff(path1, path2, formatName = 'stylish') {
  const data1 = data(buildPath(path1));
  const data2 = data(buildPath(path2));

  const tree = buildTree(data1, data2);
  console.log(tree);
  return format(tree, formatName);
}
export default genDiff; 