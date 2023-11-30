import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const addDocument = async (path, documentData) => {
    try {
        if (!path || !documentData) {
            throw new Error('Invalid parameters: path and documentData are required.');
        }

        await addDoc(collection(db, path), documentData);

        // Document added successfully
        console.log('Document added successfully!');
    } catch (error) {
        // Handle the error, log it, or display an error message
        console.error('Error adding document:', error);
        throw error; // Re-throw the error to be handled by the calling code if needed
    }
};

export default addDocument;