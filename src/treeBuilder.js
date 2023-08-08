import _ from 'lodash';

export const plainObj = (o) => {
  const values = Object.values(o);
  return values.reduce((acc, value) => {
    if (acc === false || _.isObject(value)) return false;
    return true;
  }, true);
};

export const buildTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2), (k) => k);
  const result = sortedKeys.reduce((acc, key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (_.isObject(val1) && _.isObject(val2)) return { ...acc, [`${key}`]: buildTree(val1, val2) };
    if (val1 === val2) return plainObj(obj1) ? { ...acc, [`  ${key}`]: val1 } : { ...acc, [`${key}`]: val1 };
    if (keys1.includes(key) && !keys2.includes(key)) return { ...acc, [`- ${key}`]: val1 };
    if (!keys1.includes(key) && keys2.includes(key)) return { ...acc, [`+ ${key}`]: val2 };
    return { ...acc, [`- ${key}`]: val1, [`+ ${key}`]: val2 };
  }, {});
  return result;
};
