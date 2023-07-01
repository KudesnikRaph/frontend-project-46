#!/usr/bin/env node
import { program } from "commander";
import gendiff from "../src/index.js";

  program
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0', '-V, --version', 'output the version number')
    .option('-f, --format <type>', 'output format')
    .argument('<filepath1> <filepath2>')
    .action((file1, file2, options) => {
      const { format } = options;
      console.log(gendiff(file1, file2, format));
    });
  
  program.parse();