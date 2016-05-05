import actionTypes from '../actions/types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  count: 0
});

export default function counter(state = initialState, action = {}) {
  switch (action.type) {
    case actionTypes.increment:
      return state.merge({
        count: state.count + 1
      });
    case actionTypes.decrement:
      return state.merge({
        count: state.count - 1
      });
    default:
      return state;
  }
}
