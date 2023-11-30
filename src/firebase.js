import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyD1C1IbvEiOrTBJMaQkLZPqoZ45kBVVHKE",
  authDomain: "bj-hotel.firebaseapp.com",
  projectId: "bj-hotel",
  storageBucket: "bj-hotel.appspot.com",
  messagingSenderId: "803575555210",
  appId: "1:803575555210:web:86cab8ca833e37d1607973"
};



  const app = initializeApp(firebaseConfig);
  export const auth = getAuth (app);
  export const db = getFirestore (app);
  export const storage = getStorage(app)