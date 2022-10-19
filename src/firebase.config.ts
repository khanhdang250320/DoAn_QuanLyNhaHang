import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCnP1QMnYnbfYXSWVa9cZvzGec1Mt6vY8k",
    authDomain: "thongapp-f7104.firebaseapp.com",
    projectId: "thongapp-f7104",
    storageBucket: "thongapp-f7104.appspot.com",
    messagingSenderId: "401200590455",
    appId: "1:401200590455:web:5cdcd13781894b3904e072",
    measurementId: "G-KGTYXK3MDH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);