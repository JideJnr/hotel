import React from 'react'
import Logo from '../assets/logo.png'
import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect } from 'react';
import { useState } from 'react';
import RecordList from './RecordList';
import { db } from '../firebase';
import PersonList from './PersonList';
import Modal from './Modal';
import ViewCustomer from './ViewCustomer';
import Navbar from '../component/Navbar'

const AllCustomer = () => {

    const [loading, setLoading] = useState(false);
    const [record, setRecord] = useState([]);
    const path = 'hotel/afejalo/client'; // Replace with the actual path

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);

        // Fetch documents from the 'hotels' collection
        const recordRef = collection(db, path);
        const q = query(recordRef);
        const querySnapshot = await getDocs(q);

        let recordData = [];
        querySnapshot.forEach((doc) => {
          recordData.push(doc.data());
        });

        // Set record state with the fetched data
        setRecord(recordData);
      } catch (error) {
        console.error('Error getting documents: ', error);
      } finally {
        // Set loading to false after the call is completed (whether it was successful or not)
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [path]); // Include path as a dependency



  return (
    <div className="w-screen h-screen">
    <Navbar />
    {loading ? (
      // Render loading screen while data is being fetched
      <p>Loading...</p>
    ) : (
      <div>
        
        <main className='h-full overflow-y-auto'>
        
        <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr className='grid grid-cols-10 '>
                <th className="p-2 col-span-5">
                  <p className="font-semibold text-left">Client Name</p>
                </th>
                <th className="p-2 col-span-2">
                  <p className="font-semibold text-center">Visitation This Month</p>
                </th>
                <th className="p-2 col-span-3">
                  <p className="font-semibold text-center">Total Revenues</p>
                </th>
                
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700 w-full">
               
                <div className=''>

                  {record.map((record) => (

                  <Modal
                  button={<PersonList client={record}  />}
                  modalContent={<ViewCustomer client={record}/>} // Pass the record data to the modal content
                  key={record.uid}
                  client={record}
                  />

                  
                  ))}

                  </div>
            </tbody>
          </table>
        </div>
      </div>
        </main>
        

      </div>
    )}
  </div>
  )
}

export default AllCustomer