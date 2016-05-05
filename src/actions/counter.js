import actionTypes from './types';

export function increment() {
  return {type: actionTypes.increment};
}

export function decrement() {
  return {type: actionTypes.decrement};
}
