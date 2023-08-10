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