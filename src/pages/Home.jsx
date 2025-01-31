import React from 'react'
import starBg from "../assets/Home/starBg.png"
import flyingCat from "../assets/Home/flyingCat.png"
import globe from "../assets/Home/globe.png"
import compiler from "../assets/Home/compiler.png"


const Home = () => {
  return (
    <div
      className=" w-full bg-contain  bg-center flex flex-col items-center relative z-5"
    // style={{ backgroundImage: `url(${starBg})` }}
    >

      <div className='absolute z-0  '> <img src={starBg} alt="" /></div>

      {/* Hero Section */}
      <div className='w-11/12 mx-auto mt-[10rem] flex justify-evenly items-center text-white '>

        {/* left */}
        <div className='flex flex-col z-0'>
          <img src={flyingCat} alt="" className='' />
          <button className='bg-blue-400 w-[8rem] mx-auto rounded-md text-center py-2 hover:scale-105 transition-all duration-200 cursor-pointer'>Start Coding</button>
        </div>

        {/* right */}
        <div className='text-white w-[30%] text-start flex flex-col gap-y-5 font-semibold -mt-10 mr-10'>
          <p className='text-4xl'>CodeLab</p>
          <p className='text-lg font-light text-justify'>Welcome to CodeLab, go-to online codee editor! Designed with user friendliness in mind, CodeLab offers an INTUTIVE and SEAMLESS coding experience. Whether you’re a beginner or an experienced developer, our platform provides all the tool you need to write,test and share . Join the CodeLab Community and unlock your coding potencial today!  </p>
        </div>

      </div>


      {/* image */}
      <div className='w-full mt-10'>
        <img src={globe} alt="" className='w-full' />
      </div>


      {/*  code editor */}
      <div className='w-[70%] flex mt-10 justify-between mx-auto items-start h-[28rem]'>
        {/* left */}
        <div className='w-[50%] mt-[5rem] '>
          <p className='text-4xl font-semibold'>Online Code Editor</p>
          <p className='text-justify text-lg font-thin mt-5 '>Experience the simplecity and power of coding with our intuitive code editor. Designed for developers of all leaves, Our editor provides the tools and features you need to bring your ideas to life. <br />
            Get started today and unlock your potential, one line code at a time. </p>
          <div className='mx-auto  flex justify-center'>
            <button className='bg-black shadow-2xl shadow-gray-700  text-white w-[8rem] mt-10 mx-auto rounded-md text-center py-2 hover:scale-105 transition-all duration-200 cursor-pointer'>Start Coding</button>
          </div>
        </div>

        {/* right */}
        <div className='w-[50%]'>
          <img src={compiler} alt="" className='w-[80%] mx-auto' />
        </div>
      </div>


    </div>
  )
}

export default Home