import React from 'react'

const RoomList = ({data,onClick}) => {
    console.log(data)
  return (

   
        <tr className='w-full grid grid-cols-10 ' onClick={onClick}>
                                
                                    
            <td class=" col-span-4 md:col-span-4 px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                <div class="flex items-center gap-x-2">
                    <img class="object-cover w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt=""/>
                    <div>
                        <h2 class="text-xs font-medium text-black  ">Room{data.roomNumber}</h2>
                        <p class="text-sm  text-black">Suite</p>
                    </div>
                </div>
            </td>
            <td class="   col-span-2  px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">#{data.lodge}</td>
            <td class="col-span-2 px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">#{data.shortRest}</td>

            <td class="col-span-2    px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">#{data.lodge}</td>
            
            
        
        </tr>

   


  )
}

export default RoomList