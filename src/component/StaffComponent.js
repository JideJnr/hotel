import React, { useEffect, useState } from 'react'
import PersonList from './PersonList'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';

const StaffComponent = () => {
    const [staff, setStaff] = useState([]);
  
    const path = `staff`
   
  
    useEffect(() => {
        const staffRef = collection(db, path);
      
        const q = query(staffRef);
      
        getDocs(q)
          .then((querySnapshot) => {
            let staff = [];
            querySnapshot.forEach((doc) => {
              staff.push(doc.data());
            });
            setStaff(staff);
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      }, []);
  
  return (
    <section class="container mx-auto">
        
        <div class="flex items-center gap-x-3">
            <h2 class="text-lg font-medium text-gray-800 dark:text-white">Team members</h2>

            <span class="px-3 py-1 ml-auto my-auto text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 text-bold">{staff.length} Staffs</span>
        </div>

        <div class="flex flex-col mt-6">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-gray-50 dark:bg-gray-800 ">
                                <tr className='grid grid-cols-10'>
                                    <th scope="col" class="col-span-5 py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <div class="flex items-center gap-x-3">

                                            <span>Name</span>

                                        </div>
                                    </th>

                                    <th scope="col" class=" col-span-2 px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    
                                            <span className='justify-center '>Role</span>

                                            
                                    </th>

                                    <th scope="col" class=" col-span-3 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    
                                            <span>Status</span>

                                        
                                    
                                    </th>

                                    
                                
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900 w-full">
                                
                                
                            {staff.map((staff) => (

                                <PersonList key={staff.uid} data={staff} />
                            ))}

                            
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

   
    </section>
  )
}

export default StaffComponent