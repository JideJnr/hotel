import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useFirestoreDocument = (path) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const documentRef = doc(db, path);

      try {
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
          setData(documentSnapshot.data());
        } else {
          console.log("Document not found");
        }
      } catch (error) {
        console.error("Error getting document: ", error);
      }
    };

    fetchData();
  }, [path]);

  return data;
};


