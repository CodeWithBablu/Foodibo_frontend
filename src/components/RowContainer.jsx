import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import Notfound from '../assets/NotFound.svg'
import { useStateValue } from '../context/Sateprovider';
import { actionType } from '../context/reducer';
const cart = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white font-poppins font-extrabold">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>;

const fire = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-indigo-600 font-extrabold">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
</svg>;



export default function RowContainer({ flag, data, scroll_left, scroll_right }) {

  const { cartItems, dispatch, onAdd } = useStateValue();



  useEffect(() => {
    document.getElementById('slider').scrollLeft += -300;
  }, [scroll_left]);

  useEffect(() => {
    document.getElementById('slider').scrollLeft += 300;
  }, [scroll_right]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  return (
    <div id='slider' className={` w-full my-10 flex gap-4 ${flag ? 'overflow-x-scroll scrollbar-hide scroll-smooth' : 'overflow-x-hidden justify-center flex-wrap'}`}>

      {
        data ? (data.map((item) => (
          <div key={item.id} className=' flex flex-col justify-between items-center w-300 min-w-[300px] md:min-w-[340px] my-12 h-auto bg-gray-200 backdrop-blur-lg p-2 hover:scale-95 duration-200 ease-in-out rounded-xl'>
            <div className=' w-full flex items-center justify-between'>
              <motion.img
                whileTap={{ scale: 0.75 }}
                className=' w-32 h-32 md:w-40 -mt-14 object-contain'
                src={item?.imageURL} alt="" />
              <motion.div
                onClick={() => onAdd(item, 1)}
                whileTap={{ scale: 0.75 }}
                className=' w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer p-1'>
                {cart}
              </motion.div>
            </div>
            <div className=' w-full flex flex-col items-end justify-end'>
              <p className=' text-textColor font-semibold text-base md:text-lg'>{item?.title}</p>
              <p className=' flex items-center gap-1 mt-1 text-sm text-gray-800 font-bold'>{fire}{item?.calories}</p>
              <div className=' flex items-center gap-8'>
                <p className=' text-lg text-rose-400 font-bold'>
                  <span className=' text-sm text-rose-600 font-poppins'>Rs.</span>{" "}{item?.price}
                </p>
              </div>
            </div>
          </div>
        ))) : (
          <div className=' w-full flex justify-center'>
            <img className=' w-460' src={Notfound} alt="" />
          </div>
        )
      }


    </div>
  )
}
