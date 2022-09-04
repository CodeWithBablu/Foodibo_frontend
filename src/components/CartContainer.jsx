import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStateValue } from '../context/Sateprovider';
import { actionType } from '../context/reducer';

import getStripi from '../utils/getStripi';

import EmptyCart from "../assets/emptyCart.svg"
import { useAuth0 } from '@auth0/auth0-react';


const arrowLeft = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-800">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
</svg>;

const close = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>;

const plus = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>;


const minus = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
</svg>;


//Animation variants
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
  disappear: { opacity: 0, scale: 0.8 }
}

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.1,
    }
  },
  disappear: {
    opacity: 0,
    transition: {
      duration: 0.4,
    }
  }
}




export default function CartContainer() {

  const { user } = useAuth0();

  const { cartItems, cartShow, totalPrice, dispatch, setTotalQty, setTotalPrice, setCartItems, onRemove, onAdd } = useStateValue();

  function clearCart() {
    localStorage.setItem('cartItems', JSON.stringify([]));
    setCartItems([]);
    setTotalQty(0);
    setTotalPrice(0);
  }

  //Payment
  const handleCheckout = async () => {
    const stripe = await getStripi();

    const stripeData = {
      user: user,
      cartItems: cartItems,
    }

    const response = await fetch('http://localhost:5000/stripi', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stripeData),
    }
    );
    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <motion.div
      key="wrapper"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 150 }}

      className=' fixed top-0 right-0 w-full z-50 text-white md:w-460 h-screen bg-gray-200 drop-shadow-md flex flex-col'>

      <div className=' w-full flex items-center justify-between p-4 cursor-pointer'>

        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => dispatch({ type: actionType.SET_CARTSHOW, cartShow: !cartShow })}
        >
          {arrowLeft}
        </motion.div>

        <p className=' text-headingColor text-lg font-bold font-poppins'>Cart</p>

        <motion.div whileTap={{ scale: 0.75 }}
          onClick={() => clearCart()}
          className=' flex items-center gap-2 p-1 px-2 my-2 font-poppins bg-gray-300 rounded-md hover:shadow-md cursor-pointer text-rose-500 text-base'>
          Clear {close}
        </motion.div>

      </div>

      {
        cartItems && cartItems.length > 0 ? (
          <div className=' w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>

            <motion.div
              layout
              variants={cards}
              initial="hidden"
              animate="show"
              exit="disappear"
              className=' w-full h-3/6 md:h-510 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-hide'>
              {/* cart item */}
              {
                cartItems && cartItems.map((item) => (
                  <motion.div
                    layout
                    variants={card}
                    exit={{ opacity: 0 }}
                    key={item.id} className=' w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
                    <img
                      className=' w-20 h-20 max-w-[60px] rounded-full object-contain'
                      src={item?.imageURL} alt="" />
                    <div className=' flex flex-col gap-2'>
                      <p className=' text-base text-gray-50'>{item.title}</p>
                      <p className='text-sm block text-gray-300 font-semibold'>{"Rs. "}{item.price}</p>
                    </div>
                    {/* button section */}
                    <div className=' group flex items-center gap-2 ml-auto cursor-pointer'>
                      <motion.div whileTap={{ scale: 0.75 }}
                        onClick={() => onRemove(item, -1)}
                        className=" text-gray-50">
                        {minus}
                      </motion.div>
                      <p className=' w-6 h-6 rounded-full bg-primary text-sm font-dynapuff text-gray-50 flex items-center justify-center'>
                        {item.quantity}
                      </p>
                      <motion.div whileTap={{ scale: 0.75 }}
                        onClick={() => onAdd(item, 1)}
                        className=" text-gray-50">
                        {plus}
                      </motion.div>
                    </div>
                  </motion.div>
                ))
              }

            </motion.div>
            {/* Cart total section */}
            <div className=' w-full h-3/6 gap-2 flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center md:h-auto md:justify-evenly px-8 py-2'>

              <div className=' w-full flex items-center justify-between'>
                <p className=' text-gray-400 text-lg'>Sub Total</p>
                <p className=' text-gray-400 text-lg'>Rs. {totalPrice}</p>
              </div>

              <div className=' w-full flex items-center justify-between'>
                <p className=' text-gray-400 text-lg'>Delivery</p>
                <p className=' text-gray-400 text-lg'>Rs. 10</p>
              </div>

              <div className=' w-full border-b border-gray-600 md:my-2'></div>

              <div className=' w-full flex items-center justify-between'>
                <p className=' text-gray-200 text-lg font-medium font-dynapuff'>Total</p>
                <p className=' text-gray-200 text-lg font-medium font-dynapuff'>Rs. {totalPrice + 10}</p>
              </div>

              <motion.button whileTap={{ scale: 0.75 }}
                type="button"
                onClick={handleCheckout}
                className="  w-44 md:w-full p-2 rounded-xl text-primary md:text-lg font-dynapuff font-medium my-2 hover:shadow-lg duration-150 ease-out bg-blue-gradient">
                Check out
              </motion.button>

            </div>

          </div>
        ) : (
          <div className=' w-full h-full flex flex-col items-center justify-center gap-6'>
            <img className=' w-225 md:w-300' src={EmptyCart} alt="" />
            <p className=' text-sm md:text-lg text-textColor font-semibold'>
              Please don't leave me empty 🥺️ you Guys!!
            </p>
          </div>
        )
      }
      {/* Bottom section */}


    </motion.div>
  )
}
