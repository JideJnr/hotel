import React, { useEffect, useState } from 'react';
import Listbox from '../component/ListBox';
import { getCurrentDate ,getYearMonth} from '../function/getCurrentDate';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import {  useNavigate } from 'react-router-dom';
import Button from '../component/Button';
import CustomCombobox from '../component/Combobox';

import { RadioGroup } from '@headlessui/react'


const type = [
  {
    name: 'Short-Rest',
   
  },
  {
    name: 'Lodge',
   
  },
  {
    name: 'HalfDay',
    
  },
]





function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}


const Order = ({ record, user,rooms }) => {
  const totalSales = record.reduce((total, recordItem) => total + recordItem.amount, 0);
  const notUse = rooms.map(item => !item.Inuse) ;

  const [amount, setAmount] = useState(0);
  const [client, setClient] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(notUse[0]);
  const [selectedType, setSelectedType] = useState(type[0]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(client[1]);
  const [loading, setLoading] = useState(false); // Added loading state
  const navigate = useNavigate();
  const todayDate = getCurrentDate();
  const month = getYearMonth();
  const path = `hotel/${user.state}/${todayDate}/room`
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

  const handleRoomChange = (room) => {
    setSelectedRoom(room);
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!selectedType) {
      setError('Please select a type!');
      return;
    }
  
    if (!selectedRoom) {
      setError('Please select a room!');
      return;
    }
  
    try {
      setLoading(true);
  
      const currentTime = new Date(); // Get the current date and time
  
      const docRef = await addDoc(collection(db, path), {
        name: selected.name,
        room: selectedRoom.roomNumber,
        order: selectedType.name,
        type: 'Deluxe Room',
        inUse: true,
        amount: amount,
        host: user.name,
        
      });
  
      await addDoc(collection(db, month), {
        name: selected.name,
        room: selectedRoom.roomNumber,
        order: selectedType.name,
        type: 'Deluxe Room',
        amount: amount,
        host: user.name,
        
      });
  
      await updateDoc(collection(db, path , docRef.id), {
        inUse: true,
      });
  
      const newDocId = docRef.id;
  
      await updateDoc(docRef, { id: newDocId });
  
      const updatedNumber = totalSales + amount;
  
      const totalSalesDocRef = doc(db, `hotel/${user.office}`);
      const totalSalesDocSnapshot = await getDoc(totalSalesDocRef);
  
      if (totalSalesDocSnapshot.exists()) {
        await updateDoc(totalSalesDocRef, {
          totalSales: updatedNumber,
        });
      } else {
        await setDoc(totalSalesDocRef, {
          totalSales: updatedNumber,
        });
      }
  
      navigate('/');
    } catch (err) {
      console.error('Error submitting data: ', err);
    } finally {
      setLoading(false);
    }
  };



 
  return (
    <>
    
    <div class="container max-w-screen-lg mx-auto">
      
      
        
      <div class="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div class="text-gray-600 m-auto">
              <p class="font-medium text-lg">Room Order</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div class="lg:col-span-2">
              <div class="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div class="md:col-span-5">
                  <label for="full_name">Customer  Name</label>
                  <CustomCombobox people={client}  selected={selected} setSelected={setSelected} />
                </div>

                <div class="md:col-span-5">
                  
                  <Listbox items={rooms} selectedItem={selectedRoom} label="Room Number" onChange={handleRoomChange} />
                </div>

                <div className="w-full px-4 py-16 md:col-span-5">
      <div className="mx-auto w-full max-w-md">
        <RadioGroup value={selectedType} onChange={setSelectedType}>
          <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
          <div className="space-y-2">
            {type.map((plan) => (
              <RadioGroup.Option
                key={plan.name}
                value={plan}
                className={({ active, checked }) =>
                  `${
                    active
                      ? 'ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300'
                      : ''
                  }
                  ${checked ? 'bg-sky-900/75 text-white' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline ${
                              checked ? 'text-sky-100' : 'text-gray-500'
                            }`}
                          >
                           
                            <span aria-hidden="true">&middot;</span>{' '}
                            
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>
    </div>

             

                <input
                aria-label='Enter The Amount'
                type='number'
                placeholder='Amount'
                className='md:col-span-5 text-sm text-black w-full mr-3 py-5 px-4 h-2 border  rounded mb-2'
                onChange={({ target }) => setAmount(parseFloat(target.value))}/>

                
                
            
              
                
        
                <div class="md:col-span-5 text-right">
                  <div class="inline-flex items-end">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >Close</button>
                    <Button label="Submit" onClick={handleSubmit} loading={loading} />
                  </div>
                </div>

              </div>
            </div>
          </div>
      </div>
    

    </div>

  </>
  );
};

export default Order;
