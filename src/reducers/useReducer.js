//function name reducer ->two parameter->state,action
//Redux=>common state management

export const initialState = null;

//Define a reducer function
export const reducer = (state, action) => {
  //check if the action type is "User"
  if (action.type === "USER") {
    //update the state with payload
    return action.payload;
  }

  if (action.type === "CLEAR") {
    //reset the state to null
    return null;
  }

  return state;
};
