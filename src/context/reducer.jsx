export const actionType = {
  SET_USER: "SET_USER",
  SET_FOODITEMS: "SET_FOODITEMS"
}

const reducer = (state, action) => {
  console.log(action);

  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      }

    case actionType.SET_FOODITEMS:
      return {
        ...state,
        foodItems: action.foodItems,
      }

    default:
      return state;
  }
}

export default reducer;