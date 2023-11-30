import React, { useEffect, useState } from 'react';
import Admin from './Admin';
import Staff from './Staff';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {
  const uid = auth.currentUser.uid;
  const path = `staff/${uid}`;

  const [data, setData] = useState([]);  // Use null as the initial value for an object
  const [loading, setLoading] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const docSnap = await getDoc(doc(db, path));

        if (docSnap.exists()) {
          setData(docSnap.data());
        }

        setLoading(false);
      } catch (error) {
        console.error("Error getting document: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);
  
console.log(data)
  return (
    <div>
    
      {loading ? (
        <p>Loading...</p>
      ) : (
        // Wrap the content inside parentheses
        (data && data.admin ? (
          <Admin user={data} />
        ) : (
          <Staff user={data} />
        ))
      )}
    </div>
  );
};

export default Home;
