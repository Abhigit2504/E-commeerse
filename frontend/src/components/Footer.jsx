import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div className=''>
                <img src={assets.logo} className='mb-5 w-32' alt="" />
                <p className='w-full md:w-2/3 text-gray-600'>This is the text that used for the just as sample This is the text that used for the just as sample This is the text that used for the just as sample</p>
        </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us </li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>

            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+91 9987654321</li>
                    <li>makeyourbasket@gmail.com</li>

                </ul>
            </div>
      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ makeyourbasket.com all rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer