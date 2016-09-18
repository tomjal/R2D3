import {
  ADD_USER,
  SEARCH_USER_PENDING,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_ERROR,
} from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
  all: [{
    name: 'James',
    surname: 'Bond',
    id: '007',
    gender: 'male'
  }],
  reddit: []
});

function usersReducer(state = INITIAL_STATE,
  action = { type: '', payload: null }) {
  switch (action.type) {

    case ADD_USER:
      return state.updateIn(['all'], list => list.push(fromJS({
        name: 'Jane',
        surname: 'Blond',
        id: '007',
        gender: 'female'
      })));

    case SEARCH_USER_PENDING:
      // return state.merge(INITIAL_STATE);
      return state;
    case SEARCH_USER_SUCCESS:
      // return state.merge(INITIAL_STATE);
      return state.merge(fromJS({
        // 
      }));
    case SEARCH_USER_ERROR:
      // return state.merge(INITIAL_STATE);
      return state;

    default:
      return state;
  }
}

export default usersReducer;
