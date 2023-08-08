const stringifyVal = (val) => {
  const type = typeof val;
  if (type === 'string') return `'${val}'`;
  if (val !== null && type === 'object') {
    return '[complex value]';
  }
  return val;
};

const mapping = {
  root: ({ children }) => {
    const result = children.flatMap((node) => {
      if (node.type !== 'unchanged') {
        return mapping[node.type](node, '');
      }
      return '';
    });
    return result.join('\n');
  },
  nested: ({ key, children }, path) => {
    const result = children.flatMap((node) => {
      if (node.type !== 'unchanged') {
        return mapping[node.type](node, `${path}${key}.`);
      }
      return '';
    });
    return result.join('\n');
  },
  added: (node, path) => `Property '${path}${node.key}' was added with value: ${stringifyVal(node.value)}`,
  deleted: (node, path) => `Property '${path}${node.key}' was removed`,
  changed: (node, path) => `Property '${path}${node.key}' was updated. From ${stringifyVal(node.value1)} to ${stringifyVal(node.value2)}`,
};

const workerTree1 = (ast) => {
  const iter = (node, path) => mapping[node.type](node, path);
  const output = iter(ast, '');
  return output.split('\n').filter((line) => line !== '').join('\n');
};

export default workerTree1;
