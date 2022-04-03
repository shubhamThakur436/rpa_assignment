import {act} from 'react-test-renderer';
import {AUTH_DATA} from './actions';

// This is the default state of the app i.e. when the app starts for the first time
const initialState = {
  myData: [],
};
// This is a reducer which listens to actions and modifies the state
const reducer = (state = initialState, action) => {
  const newState = {...state};
  if (action.type === 'AUTH_DATA') {
    newState.myData.push({
      authdata: action.authdata,
    });
    newState.myData = JSON.parse(JSON.stringify(newState.myData));
  }
  return newState;
};
export default reducer;
console.log(initialState.myData, 'initialState');

// export default combineReducers({
//   friends: friendsReducer
// });
