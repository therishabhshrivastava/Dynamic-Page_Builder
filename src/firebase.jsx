
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get } from 'firebase/database';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQhQcKG48TxlyZRImJ8hmmbEdLayTv-0A",
  authDomain: "dragndrop-page.firebaseapp.com",
  databaseURL: 'https://dragndrop-page-default-rtdb.firebaseio.com/',
  projectId: "dragndrop-page",
  storageBucket: "dragndrop-page.appspot.com",
  messagingSenderId: "1032489915173",
  appId: "1:1032489915173:web:81da1bbf24d5b9e1edc0cc"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set, get };