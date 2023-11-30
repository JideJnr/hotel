import React from 'react'
import ChatMessage from './ChatMessage';
import ChatTaskbar from './ChatTaskbar';
import { auth } from "../../firebase";
import Taskbar from '../../component/Navbar';



import {useLocation} from 'react-router-dom'

const Chat = () => {

  const location = useLocation()
  const {data} = location.state

  const user1 = auth.currentUser.uid
  console.log(user1)


  const user2 = data.uid


  const id = `${user2 + user1}`

    
  return (
    <div className='w-screen h-screen grid grid-row-10 grid-cols-1 bg-[#eee] overflow-hidden'>
      <div>
        <Taskbar />
      </div>
      
      <div className='span-row-8'>
        <ChatMessage id={id} user2={user2} />
      </div>
      
      <div>

      </div>
      <ChatTaskbar id={id}  user2={user2} />




    </div>
  )
}

export default Chat