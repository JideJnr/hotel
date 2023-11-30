import React, { useEffect, useState } from 'react';
import NewExpensesComponent from '../pages/Expenses'; // Rename the import
import Modal from './Modal';
import BigButton from './BigButton';
import NoticeList from './NoticeList';

import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import Badge from './Badge';
import NewNotice from './NewNotice';

const Notice = ({active}) => {

  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState([]);
  const path = 'notice'; // Replace with the actual path


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);
        
        const noticeRef = collection(db, path);
        const q = query(noticeRef);
        const querySnapshot = await getDocs(q);

        let noticeData = [];
        querySnapshot.forEach((doc) => {
          noticeData.push(doc.data());
        });

        // Set hotel state with the fetched data
        setNotice(noticeData);
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


  const empty = notice.length === 0;

  const customButton = <Badge label='New Notice'/>;
  const modalContent=<NewNotice/>;


  return (
    <section class="container  h-[200px] overflow-hidden w-full max-w-full flex flex-col border border-gray-200 dark:border-gray-700 md:rounded-lg bg-white">
       {loading ? (
        // Render loading screen while data is being fetched
        <p>Loading...</p>
      ) : (
      
      <table class=" divide-y divide-gray-200 dark:divide-gray-700 w-full bg-white ">
        <thead class="bg-gray-50 dark:bg-gray-800 flex w-full">
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Notices
          </header>
          
          {active &&           <div className='border-white border-sm ml-auto  w-fit  h-full '>
          
          <Modal button={customButton} modalContent={modalContent} />
                  

        </div> }


        </thead>
        <>


          {empty ? (
            
            <div className=' w-full h-full m'>
              <p className='items-center justify-center'>No data found</p>
            </div>
            
          ) : (
            <ul aria-label="Activity feed" role="feed" class="bg-white overflow-y-auto h-full relative flex flex-col gap-12 py-12 pl-6 before:absolute before:top-0 before:left-6 before:h-full before:border before:-translate-x-1/2 before:border-slate-200 before:border-dashed after:absolute after:top-6 after:left-6 after:bottom-6 after:border after:-translate-x-1/2 after:border-slate-200 ">
              
              {notice.map((notice) => (
                        <NoticeList key={notice.uid} data={notice} />
                      ))}
                

            </ul>
          )}
        </>


      </table>)}
    </section>
  )
}

export default Notice