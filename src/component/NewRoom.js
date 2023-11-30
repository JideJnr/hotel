import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getCurrentDate } from '../function/getCurrentDate';
import Button from './Button';

const NewNotice = ({onClick,data}) => {

  const [notice, setNotice] = useState('');
  const [note, setNote] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [shortRest, setShortRest] = useState('');
  const [halfDay, setHalfDay] = useState('');
  const [lodge, setLodge] = useState('');
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
  
    if (roomNumber === '' || lodge === '' || shortRest === '' || halfDay === '') {
      setError('Input All Fields!!!');
      setLoading(false); // Set loading to false if there is an error
      return;
    }
  
    try {
      const docRef = doc(collection(db, `hotels/${data.location}/price`), roomNumber);
  
      await setDoc(docRef, {
        roomNumber: roomNumber,
        lodge: lodge,
        shortRest: shortRest,
        halfDay: halfDay,
        inUse: false,
      });
  
      navigate('/');
    } catch (err) {
      console.error('Error submitting data: ', err);
      setError('Error submitting data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div class="container max-w-screen-lg mx-auto">
      
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-gray-600">
              <p class="font-medium text-lg">New Room</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div class="lg:col-span-2">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div class="md:col-span-5">
                  <label for="full_name">Room Number</label>
                  <input
                  aria-label='Enter The Room Number'
                  type='number'
                  placeholder='Enter The Room Number'
                  className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                  onChange={({ target }) => setRoomNumber(target.value)}/>

                </div>

                <div class="md:col-span-5">
                  <label for="notice">Lodge</label>
                  <input
                  aria-label='Enter The Price'
                  type='number'
                  placeholder='Lodge'
                  className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                  onChange={({ target }) => setLodge(target.value)}/>

                </div>

                <div class="md:col-span-5">
                  <label for="notice">shortRest</label>
                  <input
                  aria-label='Enter The Price'
                  type='number'
                  placeholder='shortRest'
                  className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                  onChange={({ target }) => setShortRest(target.value)}/>

                </div>

                
                <div class="md:col-span-5">
                  <label for="HalfDay">HalfDay</label>
                  <input
                  aria-label='Enter The Price'
                  type='number'
                  placeholder='HalfDay'
                  className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                  onChange={({ target }) => setHalfDay(target.value)}/>

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