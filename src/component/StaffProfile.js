import React, { useEffect, useState } from 'react';

import Logo from '../assets/logo.png'
import Navbar from './Navbar' 
import ConversationList from './ConversationList'

import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';


import Modal from './Modal';

import NoticeList from './NoticeList';

import Footer from './Footer';
import Badge from './Badge';
import Request from './Request';


const StaffProfile = ({data}) => {

  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [leave, setLeave] = useState([]);
  const [salary, setSalary] = useState([]);
  const path = 'hotels'; // Replace with the actual path

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);
        
        const staffRef = collection(db, path);
        const q = query(staffRef);
        const querySnapshot = await getDocs(q);

        let staffData = [];
        querySnapshot.forEach((doc) => {
          staffData.push(doc.data());
        });

        // Set hotel state with the fetched data
        setStaff(staffData);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);
        
        const leaveRef = collection(db, path);
        const q = query(leaveRef);
        const querySnapshot = await getDocs(q);

        let leaveData = [];
        querySnapshot.forEach((doc) => {
          leaveData.push(doc.data());
        });

        // Set hotel state with the fetched data
        setLeave(leaveData);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);
        
        const salaryRef = collection(db, path);
        const q = query(salaryRef);
        const querySnapshot = await getDocs(q);

        let salaryData = [];
        querySnapshot.forEach((doc) => {
          salaryData.push(doc.data());
        });

        // Set hotel state with the fetched data
        setSalary(salaryData);
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

  const customButton = <Badge label='Request'/>;
  const modalContent=<Request/>;


  
  
  return (
    <div className='bg-gray-400 text-md'>
      
      <Navbar/>

      <div className='p-5 grid grid-cols-1 gap-3  '>


        <div className='p-3 bg-white border border-white rounded-xl flex shadow  col-span-3'>
          <div className='rounded-xl'>

            <img src={Logo}  className='w-[70px] h-[70px]  border border-white rounded-xl  '/>

          </div>
          <div className='grid grid-cols-1 gap my-auto ml-2'>

            <div className='h-fit'>
              <p>{data.name}</p>
            </div>

            <div  className='h-fit'>
              <p>{data.position}</p>
            </div>
            
           

          </div>
          
        </div>

        <div className='p-3 bg-white grid grid-cols-1  gap-2 border border-white rounded-xl shadow col-span-3 lg:col-span-1 '>
          
          <div className='grid grid-cols-1 gap-2 p-3 border-b border-grey-500'>

            <p className='font-semibold'>
              Personal Information
            </p>
            <p>
              {data.about}
            </p>

          </div>

          <div className='grid grid-cols-1 gap-2 p-3'>

          
            <div className='border-white border '>

              <p className='font-semibold'>
                FullName
                <span className='font-medium'>
                {data.name}
                </span>
              </p>
              

            </div>

            <div>

              <p className='font-semibold'>
                mobile
                <span>
                  {data.phone}
                </span>
              </p>
              

            </div>

            <div>

             <p className='font-semibold'>
                Email
                <span>
                  {data.email}
                </span>
              </p>
              

            </div>

            <div>

            <p className='font-semibold'>
              Address
              <span>
                {data.address}
              </span>
            </p>

            </div>

          </div>
          
          
          
          

        </div>

        <div  className='p-3 bg-white p-3 grid grid-col-1  gap-2 border border-white rounded-xl shadow col-span-3 lg:col-span-1 '>
          
          <div className='flex'>

          
          <p>
            Salary
          </p>

          <div>
                                
          <Modal button={customButton} modalContent={modalContent} />
                    
          </div>
          </div>

          <div>

            

              {salary.map((staff) => (
                    <NoticeList key={salary.uid} data={salary} />
                  ))}
          
          </div>

        </div>

        
        <div  className='bg-white p-3 grid grid-col-1  gap-2 border border-white rounded-xl shadow col-span-3 lg:col-span-1 '>
          
          <div>
          <p>
            Leave 
          </p>

          <div>
                                
                                <Modal button={customButton} modalContent={modalContent} />
                                          
                                </div>
          
          </div>
          {leave.map((leave) => (
                  <NoticeList key={leave.uid} data={leave} />
                ))}
          
        </div>


        <div   className='bg-white p-3 grid grid-col-1  gap-2 border border-white rounded-xl shadow col-span-3  '>
         
          <p className='font-semibold'>
            Conversation
          </p>

          <div>
      
            <ConversationList  data={data} />
             
          
          </div>

          

        </div>

        <Footer/>

      </div>
        
    </div>
  )
}

export default StaffProfile