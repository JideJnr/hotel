import React, {  useState } from 'react';

import { getCurrentDate } from '../function/getCurrentDate';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import {  useNavigate } from 'react-router-dom';


import Button from './Button'

const Receipt = ({data,user}) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const navigate = useNavigate();
  const todayDate = getCurrentDate();

  const path = data.id


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const docRef = doc(db, `record/${todayDate}/room`, path);

      // Assuming selected is an object with a 'name' property
      await updateDoc(docRef, {
        inUse: false,
        
      });

      // If the asynchronous operation is successful
      navigate('/');
    } catch (err) {
      console.error('Error updating data: ', err);
      setError('An error occurred while updating data. Please try again.');
    } finally {
      setLoading(false);
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
        <p class="text-xs">afejalo</p>
    </div>
    <div class="flex flex-col gap-3 border-b py-6 text-xs">
      <p class="flex justify-between">
        <span class="text-gray-400">Room No.:</span>
        <span>#23</span>
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">Type:</span>
        <span>Deluxe</span>
      </p>
     
    </div>
    <div class="flex flex-col gap-3 pb-6 pt-2 text-xs">
      <table class="w-full text-left">
        <thead>
          <tr class="flex">
            <th class="w-full py-2">Product</th>
           
            <th class="min-w-[44px] py-2">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr class="flex">
            <td class="flex-1 py-1">Short-Rest</td>
         
            <td class="min-w-[44px]">${data.amount}</td>
          </tr>

          <tr class="flex">
            <td class="flex-1 py-1">Lodge</td>
         
            <td class="min-w-[44px]">${data.amount}</td>
          </tr>
         
          <tr class="flex">
            <td class="flex-1 py-1">Half-Day</td>
         
            <td class="min-w-[44px]">${data.amount}</td>
          </tr>
         
        </tbody>
       
      </table>
   
      <div className='grid grid-cols-1 gap-2'>

        
        
  
        <Button label='Cancel' onClick={handleUpdate}/>
 

       
        
        
        <Button label='Save'/>
      
      </div>
    </div>
  </div>

  )
}

export default Receipt