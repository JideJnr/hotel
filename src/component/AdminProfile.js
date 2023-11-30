import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.jpg'
import Navbar from './Navbar' 
import ConversationList from './ConversationList'
import Modal from './Modal';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import { useLocation } from 'react-router-dom';
import NoticeList from './NoticeList';
import Badge from './Badge';
import ViewRequest from './ViewRequest';
import Footer from './Footer';

const StaffProfile = () => {

  const location = useLocation()
  const {data} = location.state
  
  const user1 = data.uid
  const [loading, setLoading] = useState(true);
  const [leave, setLeave] = useState([]);
  const [salary, setSalary] = useState([]);
  
  const leavepath = `staff/${user1}/leave`;
  const salarypath = `staff/${user1}/salary`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);
        
        const leaveRef = collection(db, leavepath);
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
  }, [leavepath]); // Include path as a dependency

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);
        
        const salaryRef = collection(db, salarypath);
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
  }, [salarypath]); // Include path as a dependency


  
  const customButton = <Badge label='Request'/>;
  const modalContent=<ViewRequest/>;

  const salaryEmpty = salary.length === 0;
  const leaveEmpty = leave.length === 0;


  console.log(leave)
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