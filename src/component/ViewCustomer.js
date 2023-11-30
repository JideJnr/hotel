import React from 'react'
import Logo from '../assets/logo.jpg'
import { useState } from 'react';
import LodgeList from './LodgeList';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect } from 'react';
const ViewCustomer = ({client}) => {

  const [loading, setLoading] = useState(false);
  const [lodge, setLodge] = useState([]);

  const path = `afejalo/${client.phone}/lodge`; // Replace with the actual path
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);

        // Fetch documents from the 'lodges' collection
        const lodgeRef = collection(db, path);
        const q = query(lodgeRef);
        const querySnapshot = await getDocs(q);

        let lodgeData = [];
        querySnapshot.forEach((doc) => {
          lodgeData.push(doc.data());
        });

        // Set lodge state with the fetched data
        setLodge(lodgeData);
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
    <div className='grid grid-col-1 md:grid-cols-2 bg-white'>
      <div>
        <img src={Logo} className='w-full h-full'/>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 text-left'>

        <div className='p-5 '>
          <p className='font-semibold text-xl'>
            Personal Information

            

          </p>

          <div className='border-white border '>

            <p className='font-semibold'>
              FullName
              <span className='font-medium'>
              {client.name}
              </span>
            </p>

            <p className='font-semibold'>
              Phone Number
              <span className='font-medium'>
              {client.phone}
              </span>
            </p>

            <p className='font-semibold'>
              Phone Number
              <span className='font-medium'>
              {client.address}
              </span>
            </p>

          </div>

        </div>

        <div className='p-5'>
          <p className='font-semibold text-xl '>
            Lodge History


          </p>

          <div>
          {lodge ? (
        <p>No data found</p>
      ) : (
        <div className="grid grid-cols-1 h-32">
        <div className='border border-black'>
            {lodge.map((lodge) => (
              <LodgeList key={lodge.uid} data={lodge} />
            ))}
        </div>
      </div>


      )}
          </div>



        </div>



      </div>

    </div>
  )
}

export default ViewCustomer