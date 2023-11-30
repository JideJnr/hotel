import React from 'react'

const StaffDashboard = ({user ,totalSales,room}) => {

  const notUse = room.map(item => !item.Inuse) ;

  return (
    <div className='w-full h-fit'>

       
        <div className='bg-white p-5 shadow-xl my-2'>

                    
                    <div className='grid grid-cols-2 gap-3'>

                        
                        <div className='text-center'>
                            <p className='text-md font-medium'>{totalSales}</p>
                            <p className='text-sm '>Total Sales</p>
                        </div>

                        <div>
                            <p className='text-md font-medium'>{notUse.length}</p>
                            <p className='text-sm '>Available Room</p>
                        </div>


                    </div>


        </div>

    </div>
  )
}

export default StaffDashboard