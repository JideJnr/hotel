import React, { useState } from 'react'
import Admin from '../pages/Admin'
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { Timestamp, doc, setDoc } from 'firebase/firestore';
import Button from './Button';

const NewCustomer = ({onClick,user}) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const user1 = auth.currentUser.uid;
  const navigate = useNavigate();
  const path = `client`


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
      window.location.reload();
    
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
                aria-label='Enter The Customer  Name'
                type='text'
                placeholder='Jane Doe'
                className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                onChange={({ target }) => setName(target.value)}/>

                </div>

             
                <div className="mt-2 md:col-span-5">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">+234</span>
                      <input
                        type="number"
                        name="phone"
                        id="phone"
                       
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="8123456789"
                        onChange={({ target }) => setPhone(target.value)}
                      />
                      
                    </div>
                  </div>

                <div class="md:col-span-5">
                  <label for="email">Customer Address</label>
                  <input
                aria-label='Enter The Customer Address'
                type='texts'
                placeholder='Customer Address'
                className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                onChange={({ target }) => setAddress(target.value)}/>
                </div>


        
                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <Button onClick={onClick} label='Close'/>
                    <Button  onClick={handleSubmit} label='Submit' loading={loading}/>
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