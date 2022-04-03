// We speciify the name of the action as a variable
const AUTH_DATA = 'ADD_TO_COUNTER';

// This is an action creator, it simply specifies the action.
// this is what we call to send an action.
export function authData() {
  return {
    type: AUTH_DATA,
  };
}

