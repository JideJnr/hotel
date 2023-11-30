import React, { useEffect, useState } from 'react'
import Navbar from '../component/Navbar'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase'
import { collection, getDocs, query } from 'firebase/firestore'
import { getCurrentDate } from '../function/getCurrentDate'
import Realtime from '../component/Realtime'
import Dashboard from '../component/Dashboard'
import Record from '../component/Record'
import Notice from '../component/Notice'
import RecentExpenses from '../component/RecentExpenses'
import PriceList from '../component/PriceList'
import Footer from '../component/Footer'

const Hotel = () => {
    const location = useLocation()
    const {data} = location.state
 
    const [record, setRecord] = useState([]);
    const todayDate = getCurrentDate();
    const path = `record/${todayDate}/room`
   

   

    useEffect(() => {
        const hotelRef = collection(db, path);
      
        const q = query(hotelRef);
      
        getDocs(q)
          .then((querySnapshot) => {
            let record = [];
            querySnapshot.forEach((doc) => {
              record.push(doc.data());
            });
            setRecord(record);
          })
          .catch((error) => {
            console.error("Error getting documents: ", error);
          });
      }, [path]);
  
      const off = true;


  return (
    <div className='bg-gray-300'>
        <Navbar data={data}/>
        <Dashboard data={record}/>
        <Realtime data={record}/>
        <Record data={record}/>
        <RecentExpenses />
        <PriceList/>
        <Notice  off={off}/>
        <Footer/>
        
    </div>
  )
}

export default Hotel