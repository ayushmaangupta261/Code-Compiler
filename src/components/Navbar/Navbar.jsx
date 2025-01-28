import React from 'react'
import { Navigate, useNavigate } from 'react-router'

const Navbar = () => {

    // const navigate = useNavigate();


    return (
        <div className='w-11/12 mx-auto flex justify-between items-center pt-5'>
            {/* left */}
            <div>
                <button className='text-4xl font-bold cursor-pointer'>Code Lab</button>
            </div>

            {/* Right */}
            <div className='w-[30%] flex justify-between '>
                <div className='hover:scale-110 transition-all duration-300'><p className='text-xl cursor-pointer'>Home</p></div>
                <div className='hover:scale-110 transition-all duration-300'><p className='text-xl cursor-pointer'>About</p></div>
                <div className='hover:scale-110 transition-all duration-300'><p className='text-xl cursor-pointer'>Let's Code</p></div>
                <div className='hover:scale-110 transition-all duration-300'><p className='text-xl cursor-pointer'>LogIn</p></div>
                <div className='hover:scale-110 transition-all duration-300'><p className='text-xl cursor-pointer'>Profile</p></div>
            </div>

        </div>
    )
}

export default Navbar