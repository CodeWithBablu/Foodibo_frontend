import React, { useEffect, useState } from 'react'
import HomeContainer from './HomeContainer';

import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/Sateprovider';
import MenuContainer from './MenuContainer';
import CartContainer from './CartContainer';

const leftArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-extrabold font-poppins">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
</svg>;

const rightArrow = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 font-extrabold font-poppins">
  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
</svg>;


export default function MainContainer() {
  const [{ foodItems }, dispatch] = useStateValue();

  const [scroll_left, setScroll_Left] = useState(0);
  const [scroll_right, setScroll_Right] = useState(0);

  return (
    <div className=' w-full h-auto flex flex-col items-center justify-center'>
      <HomeContainer />
      <section className=' w-full p-2 md:p-4'>
        <div className=' w-full flex items-center justify-between '>
          <p className=' text-2xl font-semibold capitalize text-indigo-300 relative
          before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2
          before:left-0 before:bg-gradient-to-tr from-indigo-200 to-indigo-500 transition-all ease-in-out duration-100'>
            Our Fresh & Healthy Food
          </p>

          <div className=' hidden md:flex gap-3 items-center'>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => setScroll_Left((prev) => prev + 1)}
              className=' w-8 h-8 rounded-lg bg-indigo-300 hover:bg-indigo-400 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'>
              {leftArrow}
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.75 }}
              onClick={() => setScroll_Right((prev) => prev - 1)}
              className=' w-8 h-8 rounded-lg bg-indigo-300 hover:bg-indigo-400 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center'>
              {rightArrow}
            </motion.div>
          </div>
        </div>
        <RowContainer
          scroll_left={scroll_left}
          scroll_right={scroll_right}
          flag={true}
          data={foodItems?.filter((item) => item.category === "fruits")}
        />
      </section>

      <MenuContainer />

      <CartContainer />
    </div>
  )
}
