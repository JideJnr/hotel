import React, { useEffect, useState } from 'react';
import ExpensesList from './ExpensesList';
import { getCurrentDate } from '../function/getCurrentDate';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import NewExpensesComponent from '../pages/Expenses'; // Rename the import
import Modal from './Modal';
import BigButton from './BigButton';
import Badge from './Badge';

function Expenses({expenses}) {

    
      const customButton = <Badge label='New Expenses'/>;
      const modalContent=<NewExpensesComponent/>;

      const empty = expenses.length === 0;


  


    
  return (
    <section class="container my-5 w-full max-w-full flex flex-col border border-gray-200 dark:border-gray-700 md:rounded-lg">

        <table class=" divide-y divide-gray-200 dark:divide-gray-700 w-full">
            
            <thead class="bg-gray-50 dark:bg-gray-800 flex w-full">
                <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
                    Today
                </header>

                <div className='border-white border-sm ml-auto  w-fit'>
                    
                    <Modal button={customButton} modalContent={modalContent} />
                    

                </div>

            </thead>
            
            <tbody class="  h-[250px] overflow-y-auto bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">

                {empty ? (
                    <p>No data found</p>
                ) : (  
                        
                    <>    
                                {expenses.map((expenses) => (
                                <ExpensesList
                                key={expenses.uid}
                                data={expenses}

                                
                            />
                                ))}
                                

                    </>

                )}

                    
            </tbody>
            
        </table>
        
            
            
        


</section>
  );
}

export default Expenses;