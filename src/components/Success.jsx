
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Link, useParams } from "react-router-dom";

import formatMoney from '../utils/formatMoney';

import KunfuPanda from "../assets/kunfupanda.png"
import { useStateValue } from '../context/Sateprovider';

export default function Success() {

  const URL = import.meta.env.VITE_BASE_URL;

  const { setTotalQty, setTotalPrice, setCartItems } = useStateValue();

  const params = useParams();

  const [order, setOrder] = useState(null);


  async function fetchSession() {

    const Order = await (await fetch(`${URL}/order/${params.id}`)).json();
    setOrder(Order);
  }

  if (order == null)
    fetchSession();


  function clearCart() {

    setTotalQty(0);
    setTotalPrice(0);
    setCartItems([]);
    localStorage.setItem('cartItems', JSON.stringify([]));
  }

  return (
    <div className=' w-full h-auto  bg-primary'>
      {
        order && (
          <motion.div className="sm:mx-10 my-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="flex flex-col items-center text-sm text-white sm:shadow-2xl sm:shadow-lime-400 font-poppins gap-6">

              <h1 className="text-gray-200 text-xl font-extrabold mt-10">Thank you for your Order!</h1>

              <div className=" flex flex-col md:flex-row gap-2 text-dimWhite">
                <span>A confirmation email has been sent to </span>
                <span className=' text-lime-200'>{`${order.customer_details.email}`} </span>
              </div>

              <div className=' flex flex-col w-300 text-base'>
                <h1 className=' font-bold mb-2'>Address</h1>
                {
                  Object.entries(order.customer_details.address).map(([key, val]) => (
                    <p className=' ml-2 mt-1' key={key}>
                      <span className=" text-teal-200 capitalize font-semibold">{key}: </span>
                      <span className=" text-dimWhite font-dynapuff">{val}</span>
                    </p>
                  ))
                }
              </div>

              <div className=' flex flex-col w-300 text-base gap-4 max-h-[500px] overflow-y-scroll scrollbar-hide'>
                <h1 className=' font-bold'>Product</h1>
                {
                  order.line_items.data.map(item => (
                    <div className=" ml-2" key={item.id}>
                      <p className=" text-teal-200 font-semibold">Product : <span className=' text-sm text-dimWhite font-dynapuff font-normal'>{item.description}</span> </p>
                      <p className=" text-rose-300 ml-2 text-sm font-semibold">Quantity : <span className=' text-dimWhite font-dynapuff font-normal'>{item.quantity}</span> </p>
                      <p className="text-sky-400 ml-2 text-sm font-semibold">Price : <span className=' text-dimWhite font-dynapuff font-normal'>{formatMoney(item.price.unit_amount)}</span> </p>
                    </div>
                  ))
                }
              </div>



              <Link className=' hover:scale-95 duration-200 ease-in-out' to={'/'}
                onClick={() => clearCart()}>
                <button className="bg-gray-200 text-headingColor px-5 py-1 text-lg shadow-lg shadow-rose-400 font-bold cursor-pointer">Continue Shopping</button>
              </Link>

              <div className=' my-10'>
                <img className=' w-full px-5 sm:w-460 sm:px-0' src={KunfuPanda} alt='Kunfu-Panda' />
              </div>
            </motion.div>
          </motion.div >
        )
      }
    </div>
  );

}




{/* <motion.div className="lg:mx-10">
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2 }}
      className="flex flex-col items-center border-2 border-sky-300 shadow-2xl shadow-sky-400
        pt-2">
      <h1 className="text-cyan-400 text-2xl font-mono font-extrabold mt-2">Thank you for your Order!</h1>
      <h2 className="text-rose-200 mt-2">A confirmation email has been sent to</h2>
      <h2 className="text-sky-300">{order.customer_details.email}</h2>
      <div className="flex justify-around w-full md:w-4/5 lg:w-3/5 mt-4 mb-4">
        <div className="font-semibold px-2">
          <h3 className="text-white text-lg mb-2">Address</h3>
          {
            Object.entries(order.customer_details.address).map(([key, val]) => (
              <p className="text-[#837c7c]" key={key}>
                <span className="text-cyan-300">{key}: </span>
                <span className="text-slate-300">{val}</span>
              </p>
            ))
          }
        </div>
        <div className="font-semibold px-2">
          <h3 className="text-white text-lg mb-2">Products</h3>
          {
            order.line_items.data.map(item => (
              <div className="text-[#837c7c]" key={item.id}>
                <p className="text-sky-400">Product : {item.description}</p>
                <p className="text-amber-400 ml-2">Quantity : {item.quantity}</p>
                <p className="text-rose-400 ml-2">Price : {item.price.unit_amount}</p>
              </div>
            ))
          }
        </div>
      </div>

      <Link href={'/'}>
        <button className="bg-white text-md px-4 shadow-lg shadow-rose-400 font-bold p-1 cursor-pointer mt-2">Continue Shopping</button>
      </Link>
      <br />
      <div className="pb-2">
        <Image src={'/images/kunfupanda.png'}
          width={400}
          height={370}
          alt='Kunfu-Panda'
        ></Image>
      </div>
    </motion.div>
  </motion.div > */}