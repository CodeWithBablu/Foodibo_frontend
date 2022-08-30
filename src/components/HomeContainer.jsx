import React from 'react'
import Delivery from '../assets/delivery.png';
import HeroBg from '../assets/heroBg.png'
import { heroList } from '../constants';

export default function HomeContainer() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full p-2 md:p-4 overflow-x-hidden"
      id="home"
    >
      <div className="py-2 flex-1 flex flex-col items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-100 px-4 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="delivery"
            />
          </div>
        </div>

        <p className="text-[2.5rem] xl:text-[4.5rem] font-bold tracking-wide text-dimWhite font-poppins">
          The Fastest Delivery in
          <span className=" text-gradient-2 text-[3rem] xl:text-[5rem]">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit
          eaque fugit distinctio est nam voluptatum architecto, porro iusto
          deserunt recusandae ipsa minus eos sunt, dolores illo repellat facere
          suscipit!
        </p>

        <button
          type="button"
          className="bg-gradient-to-br from-gray-400 to-cyan-300 w-full md:w-auto px-4 py-2  font-dynapuff rounded-lg hover:scale-95 transition-all ease-in-out duration-200"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={HeroBg}
          className=" ml-auto h-420 w-full lg:w-auto lg:h-650"
          alt="hero-bg"
        />

        <div className="w-full h-full absolute top-0 left-0 flex justify-center sm:py-10  md:py-24 lg:py-4 xl:py-10 xl:px-10 gap-4 flex-wrap">
          {heroList &&
            heroList.map((n) => (
              <div
                key={n.id}
                className=" max-h-[160px] min-w-[140px] md:min-w-[160px] lg:max-h-[240px] lg:min-w-[190px] mt-5  p-2 bg-cardOverlay backdrop-blur-md rounded-2xl flex flex-col items-center justify-center drop-shadow-lg"
              >
                <img
                  src={n.icon}
                  className="w-20 lg:w-32 xl:w-40 -mt-8 lg:-mt-20 "
                  alt="I1"
                />
                <p className="text-base lg:text-xl font-semibold text-textColor">
                  {n.name}
                </p>

                <p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
                  {n.desc}
                </p>

                <p className="text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">Rs.{" "}</span> {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
