import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useStateValue } from '../context/Sateprovider';
import { actionType } from '../context/reducer';

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






export default function CartContainer() {

  const [[{ cartShow }, dispatch]] = useStateValue();

  return (
    <AnimatePresence>
      <motion.div
        key="wrapper"
        initial={{ opacity: 0, x: 200 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0 }}

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
            className=' flex items-center gap-2 p-1 px-2 my-2 font-poppins bg-gray-300 rounded-md hover:shadow-md cursor-pointer text-rose-500 text-base'>
            Clear {close}
          </motion.div>

        </div>

        {/* Bottom section */}
        <div className=' w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col'>

          <div className=' w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-hide'>
            {/* cart item */}
            <div className=' w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2'>
              <img
                className=' w-20 h-20 max-w-[60px] rounded-full object-contain'
                src="https://firebasestorage.googleapis.com/v0/b/foodibo-ce2b7.appspot.com/o/Images%2F1661765888160-f9.png?alt=media&token=aac87339-52a8-42c9-a2f3-a4e8128f2c17" alt="" />
              <div className=' flex flex-col gap-2'>
                <p className=' text-base text-gray-50'>Chocolate & Vanilla</p>
                <p className='text-sm block text-gray-300 font-semibold'>{"Rs. "}5.25</p>
              </div>
              {/* button section */}
              <div className=' group flex items-center gap-2 ml-auto cursor-pointer'>
                <motion.div whileTap={{ scale: 0.75 }}
                  className=" text-gray-50">
                  {minus}
                </motion.div>
                <p className=' w-6 h-6 rounded-full bg-primary text-sm font-dynapuff text-gray-50 flex items-center justify-center'>
                  1
                </p>
                <motion.div whileTap={{ scale: 0.75 }}
                  className=" text-gray-50">
                  {plus}
                </motion.div>
              </div>
            </div>

          </div>
          {/* Cart total section */}
          <div className=' w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>

            <div className=' w-full flex items-center justify-between'>
              <p className=' text-gray-400 text-lg'>Sub Total</p>
              <p className=' text-gray-400 text-lg'>Rs. 52</p>
            </div>

            <div className=' w-full flex items-center justify-between'>
              <p className=' text-gray-400 text-lg'>Delivery</p>
              <p className=' text-gray-400 text-lg'>Rs. 10</p>
            </div>

            <div className=' w-full border-b border-gray-600 my-2'></div>

            <div className=' w-full flex items-center justify-between'>
              <p className=' text-gray-200 text-lg font-medium font-dynapuff'>Total</p>
              <p className=' text-gray-200 text-lg font-medium font-dynapuff'>Rs. 62</p>
            </div>

            <motion.button whileTap={{ scale: 0.75 }}
              type="button"
              className=" w-full p-2 rounded-xl text-primary text-lg font-dynapuff font-medium my-2 hover:shadow-lg duration-150 ease-out bg-blue-gradient">
              Check out
            </motion.button>

          </div>

        </div>

      </motion.div>
    </AnimatePresence>
  )
}
