import React from 'react'
import { Link } from 'react-router-dom'

const PersonList = ({data}) => {
    
  return (
    <Link to='/apc' state={{data}} className='w-full'>
    <tr className='grid grid-cols-10 w-full mx-2 '>
        <td class="col-span-5   py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            <div class="inline-flex  gap-x-3">
            
                <div class="flex  gap-x-2">
                    <img class="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt=""/>
                    <div>
                        <h2 class="font-medium text-gray-800 dark:text-white ">{data.name}</h2>
                        <p class="text-sm font-normal text-gray-600 dark:text-gray-400">{data.phone}</p>
                    </div>
                </div>
            </div>
        </td>
        
        <td class="col-span-2 px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{data.position}</td>
    

        <td class="col-span-3 px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
            <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                <span class="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                <h2 class="text-sm font-normal text-emerald-500">Active</h2>
            </div>
        </td>
   
    </tr>
    </Link>

  )
}

export default PersonList