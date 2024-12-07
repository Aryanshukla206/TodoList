import React from 'react'

export const Navbar = () => {
  return (
   <nav className='flex md:justify-between p-4 text-white bg-indigo-600 hover:bg-indigo-700'>
    <div className="logo">
        <span className="font-bold text-xl mx-10">iTask</span>
    </div>
    <ul className="flex gap-10 mx-10">
        <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
        <li className='cursor-pointer hover:font-bold transition-all duration-100'>Your Tasks</li>
    </ul>

   </nav>
  )
}
