import React from 'react'
import { Link } from 'react-router-dom'

const BestCustomerList = ({client}) => {
 
  return (
    
      <tr className='min-w-full grid grid-cols-10 '>
      <td className="p-2 col-span-5">
        <div className="flex items-center">
          <svg className="shrink-0 mr-2 sm:mr-3" width="36" height="36" viewBox="0 0 36 36">
            <circle fill="#0E2439" cx="18" cy="18" r="18" />
            <path
              d="M14.232 12.818V23H11.77V12.818h2.46zM15.772 23V12.818h2.462v4.087h4.012v-4.087h2.456V23h-2.456v-4.092h-4.012V23h-2.461z"
              fill="#E6ECF4"
            />
          </svg>
          <div className="text-slate-800 dark:text-slate-100">
            <p>
            {client.name}
            </p></div>
        </div>
      </td>
      <td className="p-2 col-span-2">
        <div className="text-center">5</div>
      </td>
      <td className="p-2 col-span-3">
        <div className="text-center text-emerald-500">$2,034</div>
      </td>
    
      </tr>
   
  )
}

export default BestCustomerList