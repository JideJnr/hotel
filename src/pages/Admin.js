import React, { useEffect, useState } from 'react';
import StaffComponent from '../component/StaffComponent';
import Chart from '../component/Chart';
import BestCustomer from '../component/BestCustomer';

import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';
import WelcomeBanner from '../component/WelcomeBanner';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { getYearMonth } from '../function/getCurrentDate';

const Admin = ({ user }) => {
  // Assuming these state variables are defined in your component
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState([]);
  const [client, setClient] = useState([]);
  const month = getYearMonth();

  const path = 'hotels'; // Replace with the actual path
  const cpath = `${month}`; // Replace with the actual path
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);

        // Fetch documents from the 'hotels' collection
        const hotelRef = collection(db, path);
        const q = query(hotelRef);
        const querySnapshot = await getDocs(q);

        let hotelData = [];
        querySnapshot.forEach((doc) => {
          hotelData.push(doc.data());
        });

        // Set hotel state with the fetched data
        setHotel(hotelData);
      } catch (error) {
        console.error('Error getting documents: ', error);
      } finally {
        // Set loading to false after the call is completed (whether it was successful or not)
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [path]); // Include path as a dependency

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Set loading to true before making the asynchronous call
        setLoading(true);

        // Fetch documents from the 'hotels' collection
        const clientRef = collection(db, cpath);
        const q = query(clientRef);
        const querySnapshot = await getDocs(q);

        let monthData = [];
        querySnapshot.forEach((doc) => {
          monthData.push(doc.data());
        });

        // Set hotel state with the fetched data
        setClient(monthData);
      } catch (error) {
        console.error('Error getting documents: ', error);
      } finally {
        // Set loading to false after the call is completed (whether it was successful or not)
        setLoading(false);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();
  }, [cpath]); // Include path as a dependency


  return (
    <div className="w-screen h-screen ">
      <Navbar />
      {loading ? (
        // Render loading screen while data is being fetched
        <p>Loading...</p>
      ) : (
        <div>
          
          <main className='h-full overflow-y-auto px-3'>
            <WelcomeBanner />
            <div className="mx-auto max-w-4xl  sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {hotel.map((hotel) => (
                  <Chart key={hotel.uid} data={hotel} />
                ))}
              </div>

              
            </div>
            <BestCustomer />
            <StaffComponent />
            <Footer/>
          </main>
        
          

        </div>
      )}
    </div>
  );
};

export default Admin;
