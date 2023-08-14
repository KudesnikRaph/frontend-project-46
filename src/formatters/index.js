import format from './stylish.js';
import workerTree1 from './plain.js';
import JSON from './json.js';

export default (formatName) => {
  switch (formatName) {
    case 'stylish':
      return format;
    case 'plain':
      return workerTree1;
    case 'json':
      return JSON;

    default:
      throw new Error('Unknown formatter');
  }
};
