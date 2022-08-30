import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../constants';


import { FiShoppingBag } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'

import { app } from '../../firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from '../context/Sateprovider';
import { actionType } from '../context/reducer';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();


const logOut = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
</svg>;

const newItem = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
</svg>;



export default function Header() {

  const [userToggle, setUserToggle] = useState(false);

  const [{ user }, dispatch] = useStateValue();

  const login = async () => {

    const { user: { providerData, refreshToken } } = await signInWithPopup(auth, provider);

    dispatch({
      type: actionType.SET_USER,
      user: providerData[0]
    })

    localStorage.setItem('user', JSON.stringify(providerData[0]));

    console.log(user);

  }

  const logout = () => {
    setUserToggle(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    })
  }

  return (
    <div className=' bg-primary w-full flex justify-between h-24 items-center px-2 sm:px-6 xl:px-0 overflow-hidden z-30'>

      <div className="relative">
        <div className="absolute top-0 left-5 w-12 h-12 bg-purple-300 rounded-full
          filter blur-xl opacity-80 animate-blob animation-delay-2000"></div>

        <div className="absolute top-0 left-28 w-12 h-12 bg-rose-300 rounded-full
          filter blur-xl opacity-80 animate-blob animation-delay-4000"></div>

        <div className="absolute top-0 left-20 -bottom-2 w-12 h-12 bg-cyan-300 rounded-full
          filter blur-xl opacity-80 animate-blob animation-delay-7000"></div>

        <Link to="/" className="flex justify-between items-center">
          <img className=' w-10 h-10 rounded-full' src="src/assets/Foodibo (3).png" alt="" />
          <span className="flex justify-between items-center font-righteous font-semibold text-xl sm:text-2xl lg:text-3xl ml-4
            text-gradient bg-gradient-to-r from-lime-400 via-sky-500 to-teal-400 z-10">
            foodibo
          </span>
        </Link>
      </div>

      <ul className=' hidden list-none md:flex justify-end items-center flex-1'>

        {
          navLinks.map((nav, index) => (
            <li key={nav.id} className={` text-dimWhite font-poppins font-semibold cursor-pointer text-[16px]
              ${index == navLinks.length - 1 ? "mr-10" : "mr-10"}`}>
              <a href={`#${nav.id}`}>{nav.title}</a>
            </li>
          ))
        }
      </ul>

      <div className=' flex items-center'>

        <div className=' relative'>

          <div className=" hidden sm:block absolute top-0 -left-20 w-12 h-12 bg-purple-300 rounded-full
                filter blur-xl opacity-80 animate-blob animation-delay-2000"></div>

          <div className=" hidden sm:block absolute top-0 right-10 w-12 h-12 bg-rose-300 rounded-full
                filter blur-xl opacity-80 animate-blob animation-delay-4000"></div>

          <div className=" hidden sm:block absolute top-0 -left-10 -bottom-2 w-12 h-12 bg-cyan-300 rounded-full
                filter blur-xl opacity-80 animate-blob animation-delay-7000"></div>

          <div className='flex'>
            <div
              onClick={() => {
                user ? setUserToggle((prev) => !prev) : login()
              }}
              className=' flex items-center cursor-pointer z-10 rounded-full justify-center mr-2'>
              {user ? (<img className=' w-7 h-7 rounded-full' src={user.photoURL} alt="user" />) : (<FaUserCircle className=' w-6 h-6 text-teal-300' />)}
            </div>

            <div className=' relative mr-2 xl:mr-5'>
              <div className=' flex items-center cursor-pointer justify-center'>{<FiShoppingBag className=' w-6 h-6 text-teal-300' />}</div>
              <span className=' absolute flex items-center justify-center 
                      text-[16px] text-white font-dynapuff font-medium w-5 h-5 -top-1 -right-2 bg-rose-500 rounded-full'>1</span>
            </div>
          </div>


        </div>


        <div className={`${userToggle ? 'flex' : 'hidden'} z-20 py-2 px-4 bg-black-gradient absolute top-16 right-0 mr-4 xl:mr-28
                my-2 min-w-[140px] rounded-lg sidebar`}>
          <ul className=' space-y-2 list-none flex flex-col  text-cyan-200 font-dynapuff font-medium cursor-pointer text-[18px]'>

            {
              user && user.email === "babasahebbhalekar8245@gmail.com" && (
                <li>
                  <Link to={'/createItem'}>
                    <span onClick={() => setUserToggle(false)} className='flex items-center hover:scale-105 hover:text-lime-200 duration-200 ease-in-out'>New Item {newItem} </span>
                  </Link>
                </li>
              )

            }

            {
              navLinks.map((nav, index) => (
                <li key={nav.id} className={`md:hidden  text-cyan-200 bg-transparent font-dynapuff font-medium cursor-pointer text-[18px] hover:scale-105 hover:text-lime-200 duration-200 ease-in-out`}>
                  <a href={`#${nav.id}`}>{nav.title}</a>
                </li>
              ))
            }

            <li>
              <span
                onClick={() => logout()}
                className='flex items-center mb-2 hover:scale-105 text-rose-400 hover:text-lime-200 duration-200 ease-in-out '>Logout {logOut} </span>
            </li>

          </ul>
        </div>



      </div>




    </div>
  )
}
