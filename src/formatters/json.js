import _ from 'lodash';

const item = (key, change, value) => ({
  key,
  change,
  value,
});
const updItem = (key, change, oldValue, value) => ({
  key,
  change,
  oldValue,
  value,
});

const isObject = (value, iter) => {
  if (_.isObject(value)) return iter(value);
  return value;
};

export default (json) => {
  const iteration = (tree) => {
    const keys = Object.keys(tree);
    const result = keys.reduce((acc, key, index) => {
      const splitKey = key.split(' ');
      const str = splitKey[0];
      const usedKey = splitKey[splitKey.length - 1];
      const value = tree[key];

      const nextSplitKey = keys[index + 1] ? keys[index + 1].split(' ') : [];
      const nextUsedKey = nextSplitKey[nextSplitKey.length - 1];
      const nextValue = tree[nextSplitKey.join(' ')];

      const backSplitKey = keys[index - 1] ? keys[index - 1].split(' ') : [];
      const backUsedKey = backSplitKey[backSplitKey.length - 1];

      if (usedKey === backUsedKey) return acc;

      if (usedKey === nextUsedKey) return [...acc, updItem(usedKey, 'updated', isObject(value, iteration), isObject(nextValue, iteration))];
      if (usedKey !== nextUsedKey) {
        if (str === '-' || str === '+') {
          return str === '-' ? [...acc, item(usedKey, 'removed', isObject(value, iteration))] : [...acc, item(usedKey, 'added', isObject(value, iteration))];
        }
      }
      return [...acc, item(usedKey, null, isObject(value, iteration))];
    }, []);
    return result;
  };

  return JSON.stringify(iteration(json));
};
