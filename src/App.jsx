import { Header, MainContainer, CreateContainer } from "./components"
import { Routes, Route } from "react-router-dom"

import { AnimatePresence } from "framer-motion"
import { useStateValue } from "./context/Sateprovider"
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "./context/reducer";

function App() {
  const { dispatch, setCartItems } = useStateValue();

  const fetchData = async () => {
    await getAllFoodItems().then((data) => {
      console.log(data);

      dispatch({
        type: actionType.SET_FOODITEMS,
        foodItems: data,
      })
    })
  }

  const fetchCartData = async () => {
    const CART_INFO = localStorage.getItem('cartItems');
    if (CART_INFO) {
      const cartInfo = JSON.parse(CART_INFO);
      setCartItems(cartInfo);
    }

  }

  useEffect(() => {
    fetchData();
    fetchCartData();
  }, []);


  return (
    <AnimatePresence>
      <div className=" bg-primary w-full">
        <div className=" bg-primary max-w-7xl mx-auto flex flex-col">
          <Header />
          <Routes>
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </div>
      </div>
    </AnimatePresence>
  )
}

export default App
