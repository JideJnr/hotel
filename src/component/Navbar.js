import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react';

import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import Logo from '../assets/logo.png'
import React, { useEffect, useState } from 'react';
import NewExpensesComponent from '../pages/Expenses'; // Rename the import



import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import Notification from './Notification';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example({data}) {


  
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState([]);
  const [leave, setLeave] = useState([]);
  const [notice, setNotice] = useState([]);
  const path = 'notice'; // Replace with the actual path

  const navigate = useNavigate();


  const handleSignout = async () =>{
   
    await signOut(auth);

    navigate('/');

}  ;


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





  return (
    <Disclosure as="nav" className="bg-[#511e54] w-screen ">
      {({ open }) => (
        <>
          <div className="w-full px-2 sm:px-4">
            <div className="relative flex h-16 items-center justify-between grid grid-cols-4 sm:grid-cols-5">
              <div className='col-span-1 '>

              </div>
              <div className="flex col-span-2 sm:col-span-3 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center mx-auto">
                  <Link to='/' >
                  <img
                    className="h-10 mx-auto w-auto"
                    src={Logo}
                    alt="Your Company"
                  />
                  </Link>
                </div>
            
              </div>

              <div className=" col-span-1 grid-col-2 absolute inset-y-0 right-0 flex items-center sm:pr-2 sm:static sm:inset-auto">
                <Menu as="div" className="relative ml-auto">
                  <div>
                    <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-white w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
                      </svg>

                    </Menu.Button>
                  </div>
               
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      
                      


                      {notice.map((notice) => (
                        <Link to='/p'>

                                        
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        </Link>  
                      ))}
                            
                        <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleSignout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            View All
                          </a>
                        )}
                        </Menu.Item>
                        
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3 mr-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={data && data.img ? data.img : Logo}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link to='/p'>

                    
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                      </Link>  
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={handleSignout}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>


              </div>
            </div>
          </div>

        
        </>
      )}
    </Disclosure>
  )
}