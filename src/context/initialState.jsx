import { fetchUser, fetchCart } from "../utils/fetchLocalStorage"

const userInfo = fetchUser();

export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
}