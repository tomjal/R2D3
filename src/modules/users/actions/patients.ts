import { getRedditDomains } from '../../../api/demo-reddit';

import {
  ADD_USER,
  SEARCH_USER_PENDING,
  SEARCH_USER_SUCCESS,
  SEARCH_USER_ERROR,
} from '../constants';

export function addUser() {
  return {
    type: ADD_USER,
  };
}

export function searchUser() {
  return (dispatch, getState) => {

    dispatch({
      types: [
        SEARCH_USER_PENDING,
        SEARCH_USER_SUCCESS,
        SEARCH_USER_ERROR,
      ],
      payload: {
        promise: getRedditDomains()
          .then((res) => {
            return res;
          }),
      },
    });
  };
}
