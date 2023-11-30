import React from 'react'
import Logo from '../assets/logo.png'
import { Link } from 'react-router-dom'

const ConversationList = ({data}) => {
  
  return (
    <Link to='/c' state={{data}}>
      <div className='flex h-fit'>
            
            <div className='rounded-xl'>

              <img src={Logo}  className='w-[50px] h-[50px]  border border-white rounded-xl  '/>

            </div>

            <div className='grid grid-cols-1 gap my-auto ml-2'>

              <div className='h-fit'>
                <p>Name</p>
              </div>

              <div  className='h-fit'>
                <p>Co-Founder</p>
              </div>
              
            

            </div>

          
          
      </div>
    </Link>
  )
}

export default ConversationList