import React, { useState } from 'react'
import Admin from '../pages/Admin'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';

const NewCustomer = ({onClick,user}) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user1 = auth.currentUser.uid;
  const navigate = useNavigate();
  const path = `hotel/${user.office}`


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if ( name === '' || phone === '') {
      setError('Input All Fields!!!');
      return; 
    }
  
    try {
      setLoading(true)
      await setDoc(doc(db, path, phone), {
        name: name,
        phone: phone,
        address:address,
        createdAt: Timestamp.fromDate(new Date()),
        
        createdby: user1
      });
  
      // Clear form fields and error state on successful submission
     
      setError(null);
      setLoading(false);
  
      navigate("/");
    } catch (err) {
      // Handle errors here (e.g., log or display a message)
      console.error('Error during form submission:', err);
      setError('Error during form submission. Please try again.'); // Set a meaningful error message
      setLoading(false);
    }
  };


 
  return (
  <>
    
    <div class="container max-w-screen-lg mx-auto">
      
      
        
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-gray-600">
              <p class="font-medium text-lg">Register New Customer</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div class="lg:col-span-2">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div class="md:col-span-5">
                  <label for="full_name">Customer  Name</label>      <input
                aria-label='Enter The Amount'
                type='number'
                placeholder='Amount'
                className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                onChange={({ target }) => setName(target.value)}/>

                </div>

                <div class="md:col-span-5">
                  <label for="email">Customer Number</label>
                  <input
                aria-label='Enter The Amount'
                type='number'
                placeholder='Amount'
                className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                onChange={({ target }) => setPhone(target.value)}/>

                </div>

                <div class="md:col-span-5">
                  <label for="email">Customer Address</label>
                  <input
                aria-label='Enter The Amount'
                type='number'
                placeholder='Amount'
                className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                onChange={({ target }) => setAddress(target.value)}/>
                </div>


        
                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClick}>Close</button>
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSubmit}>Submit</button>
                  </div>
                </div>

              </div>
            </div>
          </div>
      </div>
    

    </div>

  </>
  )
}

export default NewCustomer