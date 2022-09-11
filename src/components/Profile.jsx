import formatMoney from "../utils/formatMoney";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import { motion } from "framer-motion";

export default function Profile() {

  const URL = import.meta.env.VITE_BASE_URL;

  const { user, isAuthenticated } = useAuth0();

  const [userInfo, setUserInfo] = useState(null);

  const [orders, setOrders] = useState(null);


  async function fetchUserOrders() {

    var userInfo = localStorage.getItem('user');

    userInfo = userInfo === undefined || userInfo === null ? user : await JSON.parse(userInfo);

    const response = await fetch(`${URL}/userorders`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo),
    }
    );

    setUserInfo(userInfo);

    const userOrders = await (response.json());
    setOrders(userOrders);
  }

  if (orders === null)
    fetchUserOrders();




  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.75 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2 }}
    >
      {
        userInfo && orders && (
          <div className=" my-10 md:mx-10 min-h-screen font-poppins">
            <div className="py-10 flex flex-col items-center bg-gray-900 gap-4 sm:shadow-xl sm:shadow-lime-300">
              <h2 className=" text-xl text-white font-bold ">{userInfo.name}</h2>
              <p className="text-cyan-200 text-md font-bold ">{userInfo.email}</p>
              <p className="text-indigo-500 text-md font-bold ">This is Your Order History !!</p>
              <div className=" space-y-4 overflow-y-scroll scrollbar-hide max-h-[800px]">
                {
                  orders.map(order => (
                    <div key={order.id} className=" w-auto sm:w-460 bg-gray-700/40 shadow-xl rounded-md px-2 sm:px-6 py-4 
                flex flex-col justify-between gap-2">
                      <p className=" text-xs sm:text-sm text-teal-300 font-bold">Order No : <span className=' ml-2 text-xs sm:text-sm text-dimWhite font-dynapuff font-normal'>{order.id}</span> </p>
                      <p className=" text-xs sm:text-sm text-lime-400 font-bold">Paid : <span className=' ml-2 text-xs sm:text-sm text-dimWhite font-dynapuff font-normal'>{formatMoney(order.amount)}</span> </p>
                      <p className=" text-xs sm:text-sm text-sky-400 font-bold">Email : <span className=' ml-2 text-xs sm:text-sm text-dimWhite font-dynapuff font-normal'>{order.receipt_email}</span> </p>
                    </div>
                  ))
                }
              </div>
              <Link to={'/'}>
                <button className="text-black text-md font-dynapuff font-semibold my-10 py-2 px-6 bg-blue-gradient rounded-md
             hover:scale-95 duration-200 ease-in-out">Continue Shopping </button>
              </Link>
            </div>
          </div>

        )
      }
    </motion.div>
  );
}