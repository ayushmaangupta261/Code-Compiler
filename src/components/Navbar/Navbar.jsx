import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router'
import Template from '../Auth/Template';
import { setModal } from '../../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {

    const dispatch = useDispatch();


    return (
        <div className=' bg-black h-[4.5rem] w-full '>
            <div className='w-11/12 mx-auto flex justify-between items-center pt-5 text-blue-300 '>
                {/* Left */}
                <div>
                    <button className='text-4xl font-bold cursor-pointer bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text'>Code Lab</button>
                </div>

                {/* Right */}
                <div className='w-[30%] flex justify-between '>
                    <div className='hover:scale-110 transition-all duration-300'><p className='text-xl cursor-pointer'>Home</p></div>
                    <div className='hover:scale-110 transition-all duration-300'><p className='text-xl cursor-pointer'>About</p></div>
                    <div className='hover:scale-110 transition-all duration-300'><p className='text-xl cursor-pointer'>Let's Code</p></div>

                    {/* LogIn Button with Template */}
                    <div className=''>
                        <button className='hover:scale-110 transition-all duration-300 text-xl cursor-pointer'
                            onClick={() => dispatch(setModal(true))}
                        >
                            LogIn
                        </button>

                    </div>

                    <div className='hover:scale-110 transition-all duration-300'><p className='text-xl cursor-pointer'>Profile</p></div>
                </div>
            </div>

        </div>
    )
}

export default Navbar