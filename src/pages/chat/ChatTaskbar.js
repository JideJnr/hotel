import React, { useState } from 'react'
import {collection,  addDoc,  Timestamp } from 'firebase/firestore';
import { auth, db} from '../../firebase'
import Button from '../../component/Button';



const ChatTaskbar = ({user2 , id}) => {
  const [msg, setMsg] = useState('');
  const user1 = auth.currentUser.uid;

  

  const handleSubmit= async (e) => {
    e.preventDefault();
    
    
   await addDoc(collection(db, `chat/${id}/message`), {
      
        msg,
        from: user1,
        to: user2,
        createdAt: Timestamp.fromDate(new Date()),
      
        
      });
      setMsg();
};

console.log(id)

 

  return (
    <div className='flex w-full absolute bottom-0'>
        <input
                    aria-label='Enter Your Message'
                    type='text'
                    placeholder='Enter Your Message'
                    className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                    onChange={({ target }) => setMsg(target.value)}/>
        
 
        <Button  onClick={handleSubmit} label='xyz'/>
    </div>
  )
}

export default ChatTaskbar