import fetchLocalStorage from "../utils/fetchLocalStorage"

const userInfo = fetchLocalStorage();

export const initialState = {
  user: userInfo,
  foodItems: null,
}