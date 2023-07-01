import gendiff from 'gendiff.js';

describe('gendiff', () => {
  const filePath1 = './test-data/file1.json';
  const filePath2 = './test-data/file2.json';

  test('Should return expected result for stylish format', () => {
    const expected = '...'; // Здесь ожидаемый результат для формата 'stylish'
    const result = gendiff(filePath1, filePath2, 'stylish');
    expect(result).toEqual(expected);
  });

  test('Should return expected result for default format', () => {
    const expected = '...'; // Здесь ожидаемый результат для формата по умолчанию (если предусмотрен)
    const result = gendiff(filePath1, filePath2);
    expect(result).toEqual(expected);
  });

});
