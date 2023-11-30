import React from 'react'
import Button from './Button'

const Request = () => {
    const data = true
  return (
    <div class="w-80 mx-auto rounded bg-gray-50 px-6 pt-8 shadow-lg">
    <div>
      <p className='ml-auto text-right mr-2'>
        X
      </p>
    </div>
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="chippz" class="mx-auto w-16 py-4" />
    <div class="flex flex-col justify-center items-center gap-2">
        <h4 class="font-semibold">Business Name</h4>
        <p class="text-xs">Afejalo</p>
    </div>
    <div class="flex flex-col gap-3 border-b py-6 text-xs">
      <p class="flex justify-between">
        <span class="text-gray-400">Start Date.:</span>
        <span>#5033</span>
      </p>
      <p class="flex justify-between">
        <span class="text-gray-400">End Date:</span>
        <span>Jane Doe</span>
      </p>
      
    </div>
    <div class="flex flex-col gap-3 pb-6 pt-2 text-xs">
      <table class="w-full text-left">
        <thead>
          <tr class="flex">
            <th class="w-full py-2">Reason</th>
           
            
          </tr>
        </thead>
        <tbody>
          <tr class="flex">
            <td class="flex-1 py-1">Shawarma Big</td>
         
            <td class="min-w-[44px]"></td>
          </tr>
         
        </tbody>
       
      </table>
      <div class=" border-b border border-dashed"></div>
      
      <div className='grid grid-cols-1 gap-2'>

        <>
        
  {data && data ? (
    <Button label='Accept' />
  ) : (
    <p>Accepted</p>
  )}
</>
        
        
        <Button label='Deny'/>
      
      </div>
    </div>
  </div>
  )
}

export default Request