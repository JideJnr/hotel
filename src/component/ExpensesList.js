import React from 'react'

const ExpensesList = ({data}) => {
  return (


    <li className="flex px-2">
   
    <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
      <div className="grow flex justify-between">
        <div className="self-center">
          <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">
           {data.reason}
          </a>
        </div>
        <div className="shrink-0 self-start ml-2">
          <span className="font-medium text-slate-800 dark:text-slate-100 text-red-500">-${data.amount}</span>
        </div>
      </div>
    </div>
  </li>


  )
}

export default ExpensesList