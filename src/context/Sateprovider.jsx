import { createContext, useContext, useReducer, useState } from "react";

export const stateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {


  const [cartItems, setCartItems] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const onAdd = (product, qty) => {
    //Total Price
    setTotalPrice((prevTotal) => prevTotal + (qty * product.price));
    //Increase Total Quantity
    setTotalQty((prev) => prev + qty);

    console.log(product)
    console.log("HI there");
    console.log(cartItems);

    const exist = cartItems.length > 0 ? cartItems.find(item => item.id === product.id) : null;

    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...exist, quantity: exist.quantity + qty }
            : item
        )
      );
    }
    else {
      setCartItems(
        [...cartItems, { ...product, quantity: qty }]
      );
    }

  }

  const onRemove = (product, qty) => {
    //Total Price
    setTotalPrice((prevTotal) => prevTotal - product.price);
    //Decrease Total Quantity
    setTotalQty((prev) => prev - 1);

    const exist = cartItems.find((item) => item.id === product.id);

    if (exist.quantity === 1) {
      setCartItems(
        cartItems.filter((item) => item.id !== product.id)
      );
    }
    else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  }

  const [{ user, foodItems, cartShow }, dispatch] = useReducer(reducer, initialState);

  return (
    <stateContext.Provider value={{ user, foodItems, cartShow, cartItems, totalQty, totalPrice, dispatch, setCartItems, onAdd, onRemove, setTotalQty, setTotalPrice }}>
      {children}
    </stateContext.Provider >
  );
}


export const useStateValue = () => useContext(stateContext);