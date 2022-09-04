import { Header, MainContainer, CreateContainer, Success, Profile } from "./components"
import { Routes, Route } from "react-router-dom"

import { AnimatePresence } from "framer-motion"
import { useStateValue } from "./context/Sateprovider"
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect, useState } from "react";
import { actionType } from "./context/reducer";

function App() {

  var cartInfo;

  const { dispatch, setCartItems, setTotalQty, setTotalPrice } = useStateValue();

  const [cartFetched, setCartFetched] = useState(false);


  const fetchData = async () => {
    await getAllFoodItems().then((data) => {

      dispatch({
        type: actionType.SET_FOODITEMS,
        foodItems: data,
      })
    })
  }

  const fetchCartData = async () => {

    const CART_INFO = localStorage.getItem('cartItems');
    cartInfo = await JSON.parse(CART_INFO);

    if (cartInfo != null) {
      setCartItems(cartInfo);
      var totalQuantity = 0;
      var totalPrice = 0;
      cartInfo.forEach(item => {
        totalQuantity = totalQuantity + item.quantity;
        totalPrice += item.quantity * item.price;
      });

      setTotalQty(totalQuantity);
      setTotalPrice(totalPrice);
    }
    else
      setCartItems([]);

    setCartFetched(true);

  }

  useEffect(() => {
    fetchCartData();
    fetchData();
  }, []);


  return (

    cartFetched && (
      <AnimatePresence>
        <div className=" bg-primary w-full">
          <div className=" bg-primary max-w-7xl mx-auto flex flex-col">
            <Header />
            <Routes>
              <Route path="/*" element={<MainContainer />} />
              <Route path="/createItem" element={<CreateContainer />} />
              <Route path="/success/:id" element={<Success />} />
              <Route path="/profile" element={<Profile />} />

            </Routes>
          </div>
        </div>
      </AnimatePresence>
    )

  )
}

export default App
