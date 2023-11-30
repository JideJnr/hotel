import React, { useEffect, useState } from 'react'

import Modal from './Modal'
import RoomData from './RoomData'
import RoomList from './RoomList'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase'
import Badge from './Badge'
import NewRoom from './NewRoom'


const PriceList = ({user}) => {

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const path = `hotel`; // Replace with the actual path

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);

        // Fetch documents from the 'datas' collection
        const dataRef = collection(db, path);
        const q = query(dataRef);
        const querySnapshot = await getDocs(q);

        let data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });

        // Set data state with the fetched data
        setData(data);
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

  

  const empty = data.length === 0;

  const customButton = <Badge label='Add Room'/>;
  const modalContent=<NewRoom/>;


    
  return (
    
    <div class="container border  mx-auto w-full max-w-full h-[200px]overflow-y-auto">
  
                
                    <table class="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800 flex w-full">
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Price List
          </header>

          <div className='border-white border-sm ml-auto  w-fit  h-full'>
          
            <Modal button={customButton} modalContent={modalContent} />
                    

          </div>
        </thead>
                    <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr className='grid grid-cols-10 text-center '>
                            
                                <th scope="col" class=" text-center col-span-4 md:col-span-3  px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Room
                                </th>

                                <th scope="col" class=" hidden md:flex px-4 py-3.5 text-sm font-normal  text-gray-500 dark:text-gray-400">
                                    Type
                                </th>

                                <th scope="col" class="col-span-3 px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Price
                                </th>

                                <th scope="col" class="col-span-3 px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Price
                                </th>

                                
                            
                                
                            </tr>
                        </thead>

                    {empty ? (
        <p>No Room Registered Yet</p>
      ) : (<>
 
                        <tbody className="bg-white divide-y divide-gray-200  dark:divide-gray-700 dark:bg-gray-900 w-full  ">
                          

                          {data.map((data) => (
                            <Modal
                              button={<RoomList data={data} />}
                              modalContent={<RoomData data={data} user={user} />} // Pass the record data to the modal content
                              key={data.uid}
                            />
                          ))}

                        </tbody>
                        </>
      )}
                    </table>
              
            
  
    </div>

  )
}

export default PriceList