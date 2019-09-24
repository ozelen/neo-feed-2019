import {by, descBy} from './sort';

it('should sort with numeric key', () => {
  expect([
    {val: 45},
    {val: 6},
    {val: 22},
    {val: 3},
    {val: 11},
  ].sort(by('val'))).toEqual([
    {val: 3},
    {val: 6},
    {val: 11},
    {val: 22},
    {val: 45},
  ]);
});

it('should sort desc with numeric key', () => {
  expect([
    {val: 45},
    {val: 6},
    {val: 22},
    {val: 3},
    {val: 11},
  ].sort(descBy('val'))).toEqual([
    {val: 45},
    {val: 22},
    {val: 11},
    {val: 6},
    {val: 3},
  ]);
});
