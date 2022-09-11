import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { navLinks } from '../constants';

import Logo from "../assets/Foodibo.png"

import { useAuth0 } from "@auth0/auth0-react";

import { FiShoppingBag } from 'react-icons/fi'
import { FaUserCircle } from 'react-icons/fa'

import { app } from '../../firebase.config';

import { useStateValue } from '../context/Sateprovider';
import { actionType } from '../context/reducer';
import { useEffect } from 'react';


const logOutImg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.848 8.25l1.536.887M7.848 8.25a3 3 0 11-5.196-3 3 3 0 015.196 3zm1.536.887a2.165 2.165 0 011.083 1.839c.005.351.054.695.14 1.024M9.384 9.137l2.077 1.199M7.848 15.75l1.536-.887m-1.536.887a3 3 0 11-5.196 3 3 3 0 015.196-3zm1.536-.887a2.165 2.165 0 001.083-1.838c.005-.352.054-.695.14-1.025m-1.223 2.863l2.077-1.199m0-3.328a4.323 4.323 0 012.068-1.379l5.325-1.628a4.5 4.5 0 012.48-.044l.803.215-7.794 4.5m-2.882-1.664A4.331 4.331 0 0010.607 12m3.736 0l7.794 4.5-.802.215a4.5 4.5 0 01-2.48-.043l-5.326-1.629a4.324 4.324 0 01-2.068-1.379M14.343 12l-2.882 1.664" />
</svg>;


const newItem = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
</svg>;

const cartImg = <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
</svg>;




export default function Header() {

  //AUTh0 login
  const { user, isAuthenticated, isLoading, logout, loginWithRedirect } = useAuth0();

  const [userToggle, setUserToggle] = useState(false);

  const { cartShow, totalQty, cartItems, dispatch } = useStateValue();

  console.log(user);

  useEffect(() => {

    async function setUserData() {

      const userInfo = localStorage.getItem('user');

      if (userInfo !== null) {
        localStorage.setItem('user', userInfo);

        console.log(`User info`);
        console.log(userInfo);
        console.log("hi");
        dispatch({
          type: actionType.SET_USER,
          user: await JSON.parse(userInfo)
        })
      }
      else {
        localStorage.setItem('user', JSON.stringify(user));

        dispatch({
          type: actionType.SET_USER,
          user: user
        })
      }

    }

    setUserData();

  }, [user])


  const login = async () => {

    await loginWithRedirect();

  }

  const logOut = () => {

    logout({ returnTo: window.location.origin });

    setUserToggle(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    })
  }

  return (
    <div className=' bg-primary w-full flex justify-between h-24 items-center px-2 sm:px-6 xl:px-0 z-30'>

      <div className="relative">
        <div className="absolute top-0 left-8 w-10 h-10 bg-cyan-300 rounded-full
          filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>

        <div className="absolute top-0 left-28 w-10 h-10 bg-rose-300 rounded-full
          filter blur-xl opacity-100 animate-blob animation-delay-4000"></div>

        <div className="absolute top-0 left-20 -bottom-2 w-10 h-10 bg-lime-300 rounded-full
          filter blur-xl opacity-100 animate-blob animation-delay-7000"></div>

        <Link to="/" className="flex justify-between items-center">
          <img className=' w-10 h-10 rounded-full' src={Logo} alt="" />
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

          <div className=" hidden sm:block absolute top-0 -left-20 w-10 h-10 bg-gray-300 rounded-full
                filter blur-xl opacity-100 animate-blob animation-delay-2000"></div>

          <div className=" hidden sm:block absolute top-0 right-10 w-10 h-10 bg-rose-300 rounded-full
                filter blur-xl opacity-100 animate-blob animation-delay-4000"></div>

          <div className=" hidden sm:block absolute top-0 -left-10 -bottom-2 w-10 h-10 bg-lime-300 rounded-full
                filter blur-xl opacity-100 animate-blob animation-delay-7000"></div>

          <div className='flex'>

            <div className=' relative'>

              <div
                onClick={() => {
                  user ? setUserToggle((prev) => !prev) : login()
                }}
                className=' flex items-center cursor-pointer z-10 rounded-full justify-center mr-2'>
                {!isLoading && isAuthenticated ? (<img className=' w-7 h-7 rounded-full' src={user.picture} alt="user" />) : (<FaUserCircle className=' w-6 h-6 text-teal-300' />)}
              </div>

              <div className={`${userToggle ? 'flex' : 'hidden'} z-50 py-2 pl-3 bg-black-gradient absolute top-8 right-0 
                my-2 min-w-[160px] rounded-lg sidebar`}>
                <ul className=' space-y-2 list-none flex flex-col  text-cyan-200 font-dynapuff font-medium cursor-pointer text-[18px]'>

                  {
                    user && user.email === "babasahebbhalekar8245@gmail.com" && (
                      <li>
                        <Link to={'/createItem'}>
                          <span onClick={() => setUserToggle(false)} className='flex items-center hover:scale-105 hover:text-lime-200 gap-2 duration-200 ease-in-out'>New Item {newItem} </span>
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

                  {
                    user && (
                      <Link to={'/profile'} onClick={() => setUserToggle(false)}>
                        <li>
                          <span
                            className='flex items-center mb-2 hover:scale-105 text-emerald-400 hover:text-lime-200 gap-2 duration-200 ease-in-out '>My Orders {cartImg} </span>
                        </li>
                      </Link>
                    )
                  }

                  <li>
                    <span
                      onClick={() => logOut()}
                      className='flex items-center mb-2 hover:scale-105 text-rose-400 hover:text-lime-200 gap-2 duration-200 ease-in-out '>Logout {logOutImg} </span>
                  </li>

                </ul>
              </div>

            </div>

            <div
              onClick={() => dispatch({ type: actionType.SET_CARTSHOW, cartShow: !cartShow })}
              className=' relative mr-2 xl:mr-5 z-10'>
              <div className=' flex items-center cursor-pointer justify-center'>{<FiShoppingBag className=' w-6 h-6 text-teal-300' />}</div>
              {
                totalQty > 0 && (
                  <span className=' absolute flex items-center justify-center 
                      text-[16px] text-white font-dynapuff font-medium cursor-pointer w-5 h-5 -top-2 -right-2 bg-rose-500 rounded-full'>{`${totalQty}`}</span>
                )
              }
            </div>
          </div>


        </div>


        {/* <div className={`${userToggle ? 'flex' : 'hidden'} z-20 py-2 px-4 bg-black-gradient absolute top-16 right-0 mr-4
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
                onClick={() => logOut()}
                className='flex items-center mb-2 hover:scale-105 text-rose-400 hover:text-lime-200 duration-200 ease-in-out '>Logout {logOutImg} </span>
            </li>

          </ul>
        </div> */}

      </div>




    </div>
  )
}
