import { describe, it } from 'vitest';
import { twoDP } from '../utils';

describe('twoDP', () => {
  it('should put a comma in every 3 integers/characters', ({ expect }) => {
    expect(twoDP(400000)).toBe('400,000');
    expect(twoDP(4000)).toBe('4,000');
  });
});

// describe('login', () => {})

// describe('load data fail', () => {})

// describe('', () => {})
