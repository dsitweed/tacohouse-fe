// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD4ieuauG2fN5h53MD1vUPixzA3TcUxb8o',
  authDomain: 'tacohouse-101e1.firebaseapp.com',
  projectId: 'tacohouse-101e1',
  storageBucket: 'tacohouse-101e1.appspot.com',
  messagingSenderId: '411781811301',
  appId: '1:411781811301:web:886697d341923c0333ca8c',
  measurementId: 'G-MSYL8BZ2V3',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
//  Now not use
