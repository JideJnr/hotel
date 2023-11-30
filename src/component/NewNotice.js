import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getCurrentDate } from '../function/getCurrentDate';
import Button from './Button';

const NewNotice = ({onClick}) => {

  const [notice, setNotice] = useState('');
  const [note, setNote] = useState('');
  const [authority, setAuthority] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  const navigate = useNavigate();  
  const todayDate = getCurrentDate();

     


const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if the form is already being submitted
  if (loading) {
    return;
  }

  setLoading(true); // Set loading to true when the form starts submitting

  if (notice === '' || note === '') {
    setError('Input All Fields!!!');
    setLoading(false); // Set loading to false if there is an error
    return;
  }

  try {
  
    await addDoc(collection(db, 'hotel/record/notice'), {
      notice: notice,
      note: note,
    });


    await addDoc(collection(db, 'notice'), {
      notice: notice,
      note: note,
      seen: false
    });

    
    window.location.reload();

    
  } catch (err) {
    console.error('Error submitting data: ', err);
    setError('Error submitting data. Please try again.');
  } finally {
    
    setLoading(false); 
    navigate('/');}
};

  return (
    <div class="container max-w-screen-lg mx-auto">
      
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-gray-600">
              <p class="font-medium text-lg">New Notice</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div class="lg:col-span-2">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div class="md:col-span-5">
                  <label for="full_name">Note</label>
                  <input
                  aria-label='Enter The Notice'
                  type='text'
                  placeholder='Notice'
                  className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                  onChange={({ target }) => setNote(target.value)}/>

                </div>

                <div class="md:col-span-5">
                  <label for="notice">Notice</label>
                  <input
                  aria-label='Enter The Notice'
                  type='number'
                  placeholder='Notice'
                  className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                  onChange={({ target }) => setNotice(target.value)}/>

                </div>

                


            
        
                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <Button  onClick={onClick} label='Close'/>
                    <Button  onClick={handleSubmit} loading={loading} label='Submit'/>
                  </div>
                </div>

              </div>
            </div>
          </div>
      </div>
    
  </div>
  )
}

export default NewNotice