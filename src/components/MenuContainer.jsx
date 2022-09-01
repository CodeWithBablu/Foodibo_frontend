import React, { useState } from 'react'
import { motion } from 'framer-motion';

import { categories } from '../constants';
import { useStateValue } from '../context/Sateprovider';
import RowContainer from './RowContainer';

const categoryIcon = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
</svg>;


export default function MenuContainer() {

  const [filter, setFilter] = useState("chicken");

  const [[{ foodItems }, dispatch]] = useStateValue();

  return (
    <section className=' w-full -mt-12 mb-12 p-2 md:p-4'>
      <div className='w-full flex flex-col items-center justify-center'>
        <p className=' text-2xl font-semibold capitalize text-lime-200 relative
          before:absolute before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2
          before:left-0 before:bg-gradient-to-tr from-lime-200 to-lime-400 transition-all ease-in-out duration-100 mr-auto'>
          Our Hot Dishes
        </p>
        <div className=' w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-hide'>
          {
            categories && categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                onClick={() => setFilter(category.urlParamName)}
                key={category.id} className={`group ${filter === category.urlParamName ? 'bg-indigo-600' : 'bg-gray-200'} w-24 min-w-[120px] h-28 cursor-pointer rounded-lg 
                flex flex-col gap-3 items-center justify-center hover:bg-indigo-300`}>
                <div className={`flex justify-center items-center w-10 h-10 rounded-full ${filter === category.urlParamName ? 'bg-gray-200' : 'bg-indigo-300'} group-hover:bg-card`}>{categoryIcon}</div>
                <p className={`text-sm ${filter === category.urlParamName ? 'text-white' : 'text-textColor'} font-poppins font-bold group-hover:text-white`}>{category.name}</p>
              </motion.div>
            ))
          }
        </div>

        <div className=' w-full'>
          <RowContainer
            flag={false}
            data={foodItems?.filter((item) => item.category === filter)}
          />
        </div>
      </div>
    </section >
  )
}
