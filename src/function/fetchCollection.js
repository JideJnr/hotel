import React from 'react';
import { useEffect, useState } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';

const useFirestoreCollection = (path) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, path);
      const q = query(collectionRef);

      try {
        const querySnapshot = await getDocs(q);
        let collectionData = [];
        querySnapshot.forEach((doc) => {
          collectionData.push(doc.data());
        });
        setData(collectionData);
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchData();
  }, [path]);

  return data;
};

const YourComponent = () => {
  const historyData = useFirestoreCollection(`client/${auth.currentUser.uid}/history`);

  // Your component logic using historyData

  return (
    <div>
      {/* Render your component UI with the fetched data */}
    </div>
  );
};

export default YourComponent;