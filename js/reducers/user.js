/* js/reducers/user.js */

import type {Action} from '../actions/types';


const initialState = {
  isLoggedIn: false,
  hasSkippedLogin: false,
  sharedSchedule: null,
  id: null,
  name: "Max",
};

// some ES6 initialisation technique if state is not passed to reducer

function userReducer(state: State = initialState, action: Action): State {
  if (action.type === 'LOGGED_IN') {
    let {id, name, sharedSchedule} = action.data;
    console.log('reducer - LOGGED_IN');
    return {
      isLoggedIn: true,
      hasSkippedLogin: false,
      sharedSchedule,
      id,
      name,
    };
  }
  if (action.type === 'SKIPPED_LOGIN') {
    console.log('reducer - SKIPPED_LOGIN');
    return {
      isLoggedIn: false,
      hasSkippedLogin: true,
      sharedSchedule: null,
      id: null,
      name: null,
    };
  }
  if (action.type === 'LOGGED_OUT') {
    return initialState;
  }

  if (action.type === 'SET_NAME') {
    return initialState;
  }

  if (action.type === 'SET_SHARING') {
    return {
      ...state,
      sharedSchedule: action.enabled,
    };
    // immutable state - return new state with old values of state + update to sharedSchedule only
    // https://www.youtube.com/watch?v=7bMTJxvEJiE
  }
  return state;
}

module.exports = userReducer;
