export const actionType = {
  SET_USER: "SET_USER",
  SET_FOODITEMS: "SET_FOODITEMS",
  SET_CARTSHOW: "SET_CARTSHOW",
  SET_CARTITEMS: "SET_CARTITEMS",
}

const reducer = (state, action) => {

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

    case actionType.SET_CARTSHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      }

    case actionType.SET_CARTITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      }

    default:
      return state;
  }
}

export default reducer;