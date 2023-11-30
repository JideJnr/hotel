import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { getCurrentDate } from '../function/getCurrentDate';
import CustomCombobox from '../component/Combobox';
import Button from '../component/Button';

const Expenses = ({onClick}) => {

  const [amount, setAmount] = useState('');
  const [client, setClient] = useState([]);
  const [reason, setReason] = useState('');
  const [authority, setAuthority] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const [sloading, setSloading] = useState(false); 
  
  const navigate = useNavigate();  
  const todayDate = getCurrentDate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading to true before making the asynchronous call

        const clientRef = collection(db, 'client');
        const q = query(clientRef);

        const querySnapshot = await getDocs(q);

        let clients = [];
        querySnapshot.forEach((doc) => {
          clients.push(doc.data());
        });

        setClient(clients);
      } catch (error) {
        console.error('Error getting documents: ', error);
      } finally {
        setLoading(false); // Set loading to false after the call is completed
      }
    };

    fetchData();
  }, []);

     



const handleSubmit = async (e) => {
  e.preventDefault();

  if (amount === '' || reason === '') {
    setError('Input All Fields!!!');
    return;
  }

  try {
    setSloading(true);

    await addDoc(collection(db, `record/${todayDate}/expenses`), {
      amount: amount,
      reason: reason,
      authority: authority,
    });

    navigate('/');
  } catch (err) {
    // Handle error
  } finally {
    setSloading(false);
  }
};
  return (
    <div class="container max-w-screen-lg mx-auto">
      
      
        
    <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
        <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div class="text-gray-600">
            <p class="font-medium text-lg">New Expenses</p>
            <p>Please fill out all the fields.</p>
          </div>

          <div class="lg:col-span-2">
            <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
              <div class="md:col-span-5">
                <label for="full_name">Reason</label>
                <input
                aria-label='Enter The Amount'
                type='text'
                placeholder='Expense'
                className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                onChange={({ target }) => setReason(target.value)}/>

              </div>

              <div class="md:col-span-5">
                <label for="amount">Amount</label>
                <input
                aria-label='Enter The Amount'
                type='number'
                placeholder='Amount'
                className='text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                onChange={({ target }) => setAmount(target.value)}/>

              </div>

              <div class="md:col-span-5">
                <label for="email">Authorized By</label>

                <CustomCombobox people={client}  selected={authority} setSelected={setAuthority} />

              </div>


          
      
              <div class="md:col-span-5 text-right">
                <div class="inline-flex items-end">
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClick}>Close</button>
                  <Button loading={sloading} onClick={handleSubmit} label='Submit'/>
                </div>
              </div>

            </div>
          </div>
        </div>
    </div>
  

  </div>
  )
}

export default Expenses