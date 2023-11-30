import React, { useEffect, useState } from 'react';
import BestCustomerList from './BestCustomerList';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import Badge from './Badge';
import { Link } from 'react-router-dom';
import ViewCustomer from './ViewCustomer';
import Modal from './Modal';

function BestCustomer() {
  const [client, setClient] = useState([]);
  
  const path = `client`
 

  useEffect(() => {
      const clientRef = collection(db, path);
    
      const q = query(clientRef);
    
      getDocs(q)
        .then((querySnapshot) => {
          let client = [];
          querySnapshot.forEach((doc) => {
            client.push(doc.data());
          });
          setClient(client);
        })
        .catch((error) => {
          console.error("Error getting documents: ", error);
        });
    }, []);

   
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex w-full">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100 text-xl font-semibold">Best Customer List</h2>
        <div className='ml-auto'> 
                                <Link to ='/ac'>
                                <Badge label='View All' />
                                </Link>
                                </div>
      </header>
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
               
                <div className= 'w-full'>

                  {client.map((client) => (

                  <Modal 
                  button={<BestCustomerList client={client}  />}
                  modalContent={<ViewCustomer client={client}/>} // Pass the record data to the modal content
                  key={client.uid}
                  client={client}
                  />

                  
                  ))}

                  </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BestCustomer;