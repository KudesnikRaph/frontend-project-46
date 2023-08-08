import format from './stylish.js';
import workerTree1 from './plain.js';

export default (formatName) => {
  switch (formatName) {
    case 'stylish':
      return format;
    case 'plain':
      return workerTree1;

    default:
      throw new Error('Unknown formatter');
  }
};
