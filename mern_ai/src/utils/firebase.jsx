
import { initializeApp } from "firebase/app";
import  {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAh-QWLJ83Ujq77aLzaKdxIbFMTl3teYSk",
  authDomain: "mernai-81299.firebaseapp.com",
  projectId: "mernai-81299",
  storageBucket: "mernai-81299.firebasestorage.app",
  messagingSenderId: "688129355637",
  appId: "1:688129355637:web:6c34b7f3adfe69a8b32d3c",
  measurementId: "G-1PFFJVN631"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};