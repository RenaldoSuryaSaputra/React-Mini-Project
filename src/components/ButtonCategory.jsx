import React from 'react'

const ButtonCategory = ({label, onClick}) => {
  return (
    <button
    className="bg-gray-300 hover:bg-black hover:text-white w-24 rounded-full mx-4 text-black py-1 px-2 text-md my-2"
    onClick={onClick}
  >
    {label}  
  </button>
  )
}

export default ButtonCategory