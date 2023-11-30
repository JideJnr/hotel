import React from 'react'
import ReportList from './ReportList'

const Realtime = ({data}) => {

  
  return (
    <div  className='bg-white shadow-xl my-2'>

    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
  
      <div className='h-[200px] '>
        <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
          Real-Time Report
        </header>

        <div>
            
            <p className='font-medium text-xl'>
                  Active Users 
            </p>
        
            <div>
                  <p>
                      {data.length}
                  </p>
                  
            </div>
        
        </div>

        <div className='h-full overflow-y-auto'>

        {data.map((data) => (
                      <ReportList
                      key={data.uid}
                      data={data}

                      
                  />
                      ))}

        </div>
        
      </div>
     
    </div>


    
      

  </div>
  )
}

export default Realtime