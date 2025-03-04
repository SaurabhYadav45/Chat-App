import React from 'react'
import logo from '../assets/logo.svg'

const AuthLayouts = ({children}) => {
  return (
    <>
        <header className='flex justify-center  items-center shadow-md bg-[#131324]'>
        </header>

        { children }
    </>
  )
}

export default AuthLayouts
