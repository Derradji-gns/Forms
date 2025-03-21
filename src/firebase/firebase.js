
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase} from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBP6riea0DZNkvqvycUcRWuIFWqhGNGOr8",
  authDomain: "forms-2bf35.firebaseapp.com",
  databaseURL: "https://forms-2bf35-default-rtdb.firebaseio.com/",
  projectId: "forms-2bf35",
  storageBucket: "forms-2bf35.firebasestorage.app",
  messagingSenderId: "137659324776",
  appId: "1:137659324776:web:23141e0a61460414bc5edd"
};

const app = getApps().length ? getApps() [0] : initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
export {app, auth, database}