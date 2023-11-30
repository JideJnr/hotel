import React, { useEffect, useState } from 'react';
import ExpensesList from './ExpensesList';
import { getCurrentDate, getYesterdayDate } from '../function/getCurrentDate';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import AdminExpenses from './AdminExpenses';
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'


function RecentExpenses() {
    
    const [expenses, setExpenses] = useState([]);
    const [yexpenses, setYExpenses] = useState([]);
    const todayDate = getCurrentDate();
    const yesterday = getYesterdayDate();
    const path = `record/${todayDate}/expenses`
    const ypath = `record/${yesterday}/expenses`
   
   

    useEffect(() => {
        const expensesRef = collection(db, path);
      
        const q = query(expensesRef);
      
        getDocs(q)
          .then((querySnapshot) => {
            let expenses = [];
            querySnapshot.forEach((doc) => {
              expenses.push(doc.data());
            });
            setExpenses(expenses);
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      }, []);

      useEffect(() => {
        const yexpensesRef = collection(db, ypath);
      
        const q = query(yexpensesRef);
      
        getDocs(q)
          .then((querySnapshot) => {
            let yexpenses = [];
            querySnapshot.forEach((doc) => {
              yexpenses.push(doc.data());
            });
            setYExpenses(yexpenses);
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      }, []);

      const empty = expenses.length === 0;
      const yempty = yexpenses.length === 0;


      




  return (
    <div className="col-span-full xl:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700 min-h-[200px]">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Recent Expenses</h2>
      </header>
      <div className="mx-auto w-full  bg-white p-2">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-300  px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
              <header className="text-xs uppercase rounded-sm font-semibold p-2">
            Today
          </header>

                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
              <>


{empty ? (
            
            <p>No Expenses Today</p>
            
            ) : (<>

{expenses.map((expenses) => (
              <AdminExpenses
              key={expenses.uid}
              data={expenses}

              
          />
              ))}

             
              </>
)}



              </>

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-300  px-4 py-2 text-left text-sm font-medium focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
              <header className="text-xs uppercase font-semibold p-2">
            Yesterday
          </header>    
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
               
            <>


{yempty ? (
            
            <p>No Expenses Yesterday</p>
            
            ) : (<>

<ul className="my-1">

<>
{yexpenses.map((yexpenses) => (
              <AdminExpenses
              key={yexpenses.uid}
              data={yexpenses}

              
          />
              ))}

</>
</ul>

             
              </>
)}



            </>

              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
}

export default RecentExpenses;