import React from 'react'
import Logo  from './assets/logo.png'
import CircularProgress from '@mui/material/CircularProgress';

function Suspence() {
  return (
  <div className='flex w-screen h-screen bg-[#511e54] '>
        
    <div className='flex-col mx-auto my-auto '>

      <div>
      <img src= {Logo} alt=''/>

      </div>

      <div className='flex mx-auto justify-center'>
        <CircularProgress/>
      </div>
       
     
  

  </div>
  
</div>
  )
}

export default Suspence