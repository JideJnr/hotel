import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import Record from '../component/Record';
import { getCurrentDate } from '../function/getCurrentDate';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import Expenses from '../component/Expenses';
import StaffDashboard from '../component/StaffDashboard';
import Modal from '../component/Modal';
import BigButton from '../component/BigButton';
import Order from '../component/Order';
import NewCustomer from '../component/NewCustomer';
import Notice from '../component/Notice';
import WelcomeBanner from '../component/WelcomeBanner';
import Suspence from '../Suspence'
import Footer from '../component/Footer';

const Staff = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [record, setRecord] = useState([]);
  const [room, setRoom] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const todayDate = getCurrentDate();
  const recordPath = `record/${todayDate}/room`;
  const expensesPath = `record/${todayDate}/expenses`;
  const roomPath = `hotels/Ijebu/Room`;
  const [result, setResult] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch records
        const recordRef = collection(db, recordPath);
        const recordQuery = query(recordRef);
        const recordSnapshot = await getDocs(recordQuery);
        let recordData = [];
        recordSnapshot.forEach((doc) => {
          recordData.push(doc.data());
        });

        // Fetch expenses
        const expensesRef = collection(db, expensesPath);
        const expensesQuery = query(expensesRef);
        const expensesSnapshot = await getDocs(expensesQuery);
        let expensesData = [];
        expensesSnapshot.forEach((doc) => {
          expensesData.push(doc.data());
        });

                // Fetch room
        const roomRef = collection(db, roomPath);
        const roomQuery = query(roomRef);
        const roomSnapshot = await getDocs(roomQuery);
        let roomData = [];
        roomSnapshot.forEach((doc) => {
          roomData.push(doc.data());
                });
        
        setRoom(roomData);
        setRecord(recordData);
        setExpenses(expensesData);
      } catch (error) {
        console.error('Error getting documents: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [recordPath, expensesPath,roomPath]);

  const totalSales = record.reduce((total, recordItem) => total + recordItem.amount, 0);
  const totalExpenses = expenses.reduce((total, expensesItem) => total + expensesItem.amount, 0);
  const availableCash = () => {setResult(totalSales - totalExpenses);
  };

  const availableRoom = () => {setResult(totalSales - totalExpenses);
  };

  console.log(room)


  console.log(user)

  return (

    <>
    {loading ? (
      <Suspence/>
    ) : (

    <div className="w-screen h-screen overflow-hidden">
      <Navbar />

      

   
      <main className='h-full overflow-y-auto'>
      <WelcomeBanner user={user}/>
        <div className="mx-auto max-w-4xl py-6 sm:px-6 lg:px-8 grid grid-cols-1 gap-2">
          <StaffDashboard user={user} totalSales={totalSales} totalExpenses={totalExpenses} result={result} room={room} />

          <div className="grid grid-cols-2 gap-2 ">
            
            <Modal
              button={<BigButton label='Add Room' />}
              modalContent={<Order record={record} user={user}  rooms={room}/>} // Pass the record data to the modal content
            
            />

            <Modal
              button={<BigButton label="Add Customer" />}
              modalContent={<NewCustomer data={record} user={user} />} // Pass the record data to the modal content
            
            />
          </div>

          <>
              <Record data={record} user={user}/>
              <Expenses expenses={expenses} />
              <Notice/>
          </>
         
        </div>
      </main>
      <Footer/>
    </div>
    )}
    </>
  );
};

export default Staff;
