import React from 'react'

const Dashboard = ({data}) => {

    const calculateTotalAmount = () => {
        let totalAmount = 0;
    
        // Iterate through the array and sum up the amounts
        data.forEach(item => {
          // Assuming that 'amount' is a string representing a numerical value
          const numericAmount = parseFloat(item.amount);
    
          // Check if numericAmount is a valid number
          if (!isNaN(numericAmount)) {
            totalAmount += numericAmount;
          }
        });
    
        return totalAmount;
      };
    
      // Calculate the total amount
      const totalAmount = calculateTotalAmount();
    
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
                    <p className='text-md font-medium'>{totalAmount}</p>
                    <p className='text-sm '>Total Earnings</p>
                </div>

                <div>
                    <p className='text-md font-medium '>{data.length}</p>
                    <p className='text-sm '>Total Room Sold</p>
                </div>

              

            </div>
        </div>
</div>
  )
}

export default Dashboard