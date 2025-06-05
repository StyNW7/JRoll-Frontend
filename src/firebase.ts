import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // For Realtime Database
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCsS1vj1FGYhGlIr39TcVbwpt2q1aYXmgQ",
  authDomain: "jroll-693da.firebaseapp.com",
  projectId: "jroll-693da",
  storageBucket: "jroll-693da.firebasestorage.app",
  messagingSenderId: "666574495209",
  appId: "1:666574495209:web:730822133404ec8a27ff78",
  measurementId: "G-PYQV2074HD"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
export default app