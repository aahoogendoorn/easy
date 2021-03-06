import { isText, replaceAll, toString } from '../../src';
import { Dev } from '../ref';

describe('isText', () => {
  const has = { toString: 3 };

  test('correct', () => {
    expect(isText()).toBeFalsy();
    expect(isText(null)).toBeFalsy();
    expect(isText(3)).toBeTruthy();
    expect(isText(has)).toBeFalsy();
    expect(isText({})).toBeTruthy();
    expect(isText('Hello')).toBeTruthy();
    expect(isText(Dev.Jeroen)).toBeTruthy();
  });

  test('ifText without alt', () => {
    expect(toString()).toBe('');
    expect(toString('hallo')).toBe('hallo');
    expect(toString(Dev.Jeroen)).toBe('Jeroen');
  });

  test('ifText with alt', () => {
    expect(toString(undefined, 'alt')).toBe('alt');
    expect(toString(undefined, () => 'alt')).toBe('alt');
    expect(toString(has, () => 'alt')).toBe('alt');
    expect(toString('hallo', 'alt')).toBe('hallo');
    expect(toString(Dev.Jeroen, Dev.Naoufal)).toBe('Jeroen');
  });

  test('replaceAll', () => {
    expect(replaceAll('Hello', 'alt', '')).toBe('Hello');
    expect(replaceAll('Hello', 'ello', 'alt')).toBe('Halt');
    expect(replaceAll('Hello hello', 'ello', 'alt')).toBe('Halt halt');
    expect(replaceAll(Dev.Naoufal, 'Na', 'Ja')).toBe('Jaoufal');
    expect(replaceAll(Dev.Naoufal, Dev.Naoufal, Dev.Jeroen)).toBe(Dev.Jeroen.name);
  });
});
