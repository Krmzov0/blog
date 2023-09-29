import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDkZiTnVFhrTzZ-k3_BQMt-i1I5ede2j7M",
    authDomain: "blog-wen.firebaseapp.com",
    projectId: "blog-wen",
    storageBucket: "blog-wen.appspot.com",
    messagingSenderId: "1023746905997",
    appId: "1:1023746905997:web:423f94c31e207ff094cfc4",
    measurementId: "G-PLC91R5SYH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
