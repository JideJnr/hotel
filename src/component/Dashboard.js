import React from 'react'

const Dashboard = ({data}) => {
  return (
    <div>
        <p className='text-md font-medium'>
        Bee-Jay  {data.location}
        </p>

        <div className='grid grid-cols-1 gap-2 bg-white p-5 shadow-xl my-2'>

            <p className='text-xl font-semibold ' >
                Analytics
            </p>

            <div className='grid grid-cols-2 text-center'>

                
                <div>
                    <p className='text-md font-medium'>26</p>
                    <p className='text-sm '>Total Earnings</p>
                </div>

                <div>
                    <p className='text-md font-medium '>26</p>
                    <p className='text-sm '>Total Room Sold</p>
                </div>

              

            </div>
        </div>
</div>
  )
}

export default Dashboard