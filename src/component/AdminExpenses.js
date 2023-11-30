import React from 'react'

const AdminExpenses = ({data}) => {
  console.log(data)
  return (

    <ul className="my-1">
            
            <li className="flex px-2">
              <div className="w-9 h-9 rounded-full shrink-0 bg-indigo-500 my-2 mr-3">
                <svg className="w-9 h-9 fill-current text-indigo-50" viewBox="0 0 36 36">
                  <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z" />
                </svg>
              </div>
              <div className="grow flex items-center border-b border-slate-100 dark:border-slate-700 text-sm py-2">
                <div className="grow flex justify-between">
                  <div className="self-center">
                    <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">
                      {data.authority.name}
                    </a>{' '}
                    Authorized{' '}
                    <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">
                      {data.authority.name}
                    </a>{' '}
                    To Pay{' '}
                    <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">
                      {data.amount}
                    </a>{' '}
                    For
                    {' '}
                    <a className="font-medium text-slate-800 hover:text-slate-900 dark:text-slate-100 dark:hover:text-white" href="#0">
                      {data.reason}
                    </a>
                  </div>
                 
                </div>
              </div>
            </li>
            {/* Item */}


       
    </ul>
  )
}

export default AdminExpenses