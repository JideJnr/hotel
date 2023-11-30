import React from 'react'
import Button from './Button'
import { addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useState } from 'react';

const Request = () => {

  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [reason, setReason] = useState();
  const [loading, setLoading] = useState(false); // Added loading state
  const [error, setError] = useState(false); // Added loading state
  const navigate = useNavigate();
  const uid = auth.currentUser.uid

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (start === '') {
      setError('Please select Start Date!');
      return;
    }

    if (end === '') {
      setError('Please select a room!');
      return;
    }

    try {
      setLoading(true); // Set loading to true before making the asynchronous call

      await addDoc(collection(db, `staff/${uid}/leave`), {
        start: start,
        end: end,
        reason: reason,
      });

      navigate('/');
    } catch (err) {
      console.error('Error submitting data: ', err);
    } finally {
      setLoading(false); // Set loading to false after the call is completed
    }
  };
   
  return (
    <div class="w-80 mx-auto rounded bg-gray-50 px-6 pt-8 shadow-lg">
    <div>
      <p className='ml-auto text-right mr-2'>
        X
      </p>
    </div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="chippz" class="mx-auto w-16 py-4" />
    <div class="flex flex-col justify-center items-center gap-2">
        <h4 class="font-semibold">Business Name</h4>
        <p class="text-xs">Afejalo</p>
    </div>
    <div class="flex flex-col gap-3 border-b py-6 text-xs">
      <p class="flex justify-between">
        <span class="text-gray-400">Start Date.:</span>
        <input type='date'/>
       
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">End Date:</span>
        <input type='date'/>
      </p>
      
    </div>
    <div class="flex flex-col gap-3 pb-6 pt-2 text-xs">
      <table class="w-full text-left">
        <thead>
          <tr class="flex">
            <th class="w-full py-2">Reason</th>
           
            
          </tr>
        </thead>
        <tbody>
          <tr class="flex">
            <input type='text'class="flex-1 py-1"/>
         
           
          </tr>
         
        </tbody>
       
      </table>
      <div class=" border-b border border-dashed"></div>
      
      <div className='grid grid-cols-1 gap-2'>

        
        

    <Button label='Send' onClick={handleSubmit} />


        
        
        <Button label='Cancel'/>
      
      </div>
    </div>
  </div>
  )
}

export default Request