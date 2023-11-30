import React, { useEffect, useState } from 'react';
import ExpensesList from './ExpensesList';
import { getCurrentDate, getYesterdayDate } from '../function/getCurrentDate';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import AdminExpenses from './AdminExpenses';


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
      <div className="p-3">
        
        {/* "Today" group */}

        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Today
          </header>

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
          
        </div>

        {/* "Yesterday" group */}
        
        <div>
          <header className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm font-semibold p-2">
            Yesterday
          </header>          <>


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



        </div>

      </div>
    </div>
  );
}

export default RecentExpenses;