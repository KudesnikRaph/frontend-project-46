import _ from 'lodash';

export default (plainDiff) => {
  const firstString = (mainPath) => `Property '${mainPath}'`;
  const added = (addedVal) => {
    if (addedVal === '[complex value]') return ` was added with value: ${addedVal}`;
    if (_.isString(addedVal)) return ` was added with value: '${addedVal}'`;
    return ` was added with value: ${addedVal}`;
  };
  const removed = ' was removed';
  const updated = (oldMeaning, newMeaning) => {
    const values = [oldMeaning, newMeaning];
    const newValues = values.reduce((row, val) => {
      if (_.isObject(val)) return [...row, '[complex value]'];
      if (_.isString(val)) return [...row, `'${val}'`];
      return [...row, `${val}`];
    }, []);
    return ` was updated. From ${newValues[0]} to ${newValues[1]}`;
  };
  const createString = (start, condition) => `${start}${condition}`;

  const iter = (tree, currentPath) => {
    const keys = Object.keys(tree);
    const result = keys.reduce((row, key, index) => {
      const splitKey = key.split(' ');
      const mark = splitKey[0];
      const currentKey = splitKey[splitKey.length - 1];
      const value = tree[key];

      const splitedKey = keys[index + 1] ? keys[index + 1].split(' ') : [];
      const actualedKey = splitedKey[splitedKey.length - 1];
      const currentValue = tree[splitedKey.join(' ')];

      const previousSplitedKey = keys[index - 1] ? keys[index - 1].split(' ') : [];
      const previousActualedKey = previousSplitedKey[previousSplitedKey.length - 1];

      if (currentKey === previousActualedKey) return row;

      const newCurrentPath = [...currentPath, currentKey];
      const strPath = newCurrentPath.join('.');

      if (currentKey === actualedKey) {
        return [...row, createString(firstString(strPath), updated(value, currentValue))];
      }
      if (mark !== '+' && mark !== '-' && _.isObject(value)) return [...row, iter(value, newCurrentPath)];
      if (currentKey !== actualedKey) {
        if (mark === '-' || mark === '+') {
          return mark === '-' ? [...row, createString(firstString(strPath), removed)] : [...row, createString(firstString(strPath), _.isObject(value) ? added('[complex value]') : added(value))];
        }
      }
      return row;
    }, []);
    return result.join('\n');
  };

  return iter(plainDiff, []).trimEnd();
};
