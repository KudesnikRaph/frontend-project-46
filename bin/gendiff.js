#!/usr/bin/env node
import { program } from 'commander';
import gendiff from '../src/index.js';

program

  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format <type>', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action(gendiff);

program.parse();
