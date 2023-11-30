import React, { useState } from 'react'
import ExpensesList from './ExpensesList'
import RecordList from './RecordList'
import TestModal from './Modal'
import Receipt from './Receipt'
import Modal from './Modal'
const Record = ({data,user}) => {
  const empty = data.length === 0;

    
  return (
    
    <div class="container border  mx-auto w-full max-w-full h-[200px] ">
  
                
                    <table class="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr className='grid grid-cols-10 '>
                            
                                <th scope="col" class=" col-span-6 md:col-span-3  px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Client
                                </th>

                                <th scope="col" class=" hidden md:flex px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Status
                                </th>

                                <th scope="col" class="col-span-2 flex px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Time
                                </th>

                                <th scope="col" class="col-span-2 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Method
                                </th>

                                
                                <th scope="col" class="  hidden md:flex px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Amount
                                </th>

                                
                            </tr>
                    </thead>

                    <div className='h-full overflow-y-auto'>

                 

                    {empty ? (
                      
                      <p>No data found</p>
                      
                      ) : (<>
 
                        <tbody className="bg-white divide-y divide-gray-200  dark:divide-gray-700 dark:bg-gray-900 w-full  ">
                          

                          {data.map((record) => (
                            <Modal
                              button={<RecordList data={record} />}
                              modalContent={<Receipt data={record} user={user} />} // Pass the record data to the modal content
                              key={record.uid}
                            />
                          ))}

                        </tbody>
                        </>
      )}

</div>
                    </table>
              
            
  
    </div>

  )
}

export default Record