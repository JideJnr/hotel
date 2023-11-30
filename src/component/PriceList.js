import React, { useEffect, useState } from 'react'

import Modal from './Modal'
import RoomData from './RoomData'
import RoomList from './RoomList'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from '../firebase'
import Badge from './Badge'
import NewRoom from './NewRoom'


const PriceList = ({user,data}) => {

  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState([]);
  const path = `hotels/${data.location}/price`;
 // Replace with the actual path

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);

        // Fetch documents from the 'datas' collection
        const priceRef = collection(db, path);
        const q = query(priceRef);
        const querySnapshot = await getDocs(q);

        let price = [];
        querySnapshot.forEach((doc) => {
          price.push(doc.data());
        });

        // Set data state with the fetched data
        setPrice(price);
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

  

  const empty = price.length === 0;

  const customButton = <Badge label='Add Room'/>;
  const modalContent=<NewRoom data={data}/>;


    
  return (
    
    <div class="container border  mx-auto w-full max-w-full h-[200px] overflow-y-auto bg-white">
      
      <div>
      <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2 flex">
                       <p> Price List</p>

                        <div className='border-white border-sm ml-auto  w-fit h-fit'>
          
          <Modal button={customButton} modalContent={modalContent} />
                  

        </div>
      </header>

      


        </div>
      
      <table class="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800 flex w-full">


                    </thead>
                    <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr className='grid grid-cols-10 text-center '>
                            
                                <th scope="col" class=" text-center col-span-4   px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Room
                                </th>

                                <th scope="col" class="col-span-2   px-4 py-3.5 text-sm font-normal  text-gray-500 dark:text-gray-400">
                                    Lodge
                                </th>

                                <th scope="col" class="col-span-2 px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    ShortRest
                                </th>

                                <th scope="col" class="col-span-2 px-4 py-3.5 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Lodge
                                </th>

                                
                            
                                
                            </tr>
                        </thead>

                    {empty ? (
        <p>No Room Registered Yet</p>
      ) : (<>
 
                        <tbody className="bg-white divide-y divide-gray-200  dark:divide-gray-700 dark:bg-gray-900 w-full  ">
                          

                          {price.map((price) => (
                            <Modal
                              button={<RoomList data={price} />}
                              modalContent={<RoomData data={price} user={user} />} // Pass the record data to the modal content
                              key={price.uid}
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