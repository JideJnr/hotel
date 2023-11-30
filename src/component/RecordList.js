import React from 'react'

const RecordList = ({data,onClick}) => {
    console.log(data)
  return (

   
        <tr className='w-full grid grid-cols-10 ' onClick={onClick}>
                                
                                    
            <td class=" col-span-6 md:col-span-2 px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <div class="flex items-center gap-x-2">
                    <img class="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt=""/>
                    <div>
                        <h2 class="text-xs font-medium text-black  ">{data.name}</h2>
                        <p class="text-sm  text-black">{data.phone}</p>
                    </div>
                </div>
            </td>
            <td class="hidden md:flex  col-span-2  px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">Short Rest</td>
            <td class="col-span-2 px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">22:33</td>
            <td class="col-span-2 px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>

                    <h2 class="text-sm font-normal">Cash</h2>
                </div>
            </td>
            <td class="hidden md:flex md:col-span-2  px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.amount}</td>
            
            
        
        </tr>

   


  )
}

export default RecordList