import React from 'react'

const Test = ({label}) => {
  return (
    <>
      <button type="button" className="mr-3  w-full inline-block px-6 py-3 font-bold text-center bg-gradient-to-tl from-purple-700 to-pink-500 uppercase align-middle transition-all rounded-lg cursor-pointer leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-102 active:opacity-85 hover:shadow-soft-xs text-white">{label}</button>
      
    </>
  )
}

export default Test