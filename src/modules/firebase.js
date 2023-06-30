import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  // Insira as configurações do seu projeto Firebase aqui
  apiKey: "AIzaSyDJK8VPZmtIfIICaljME0U_QrJ5PPubTN8",
  authDomain: "todolist-e1acf.firebaseapp.com",
  projectId: "todolist-e1acf",
  storageBucket: "todolist-e1acf.appspot.com",
  messagingSenderId: "281055582379",
  appId: "1:281055582379:web:8ea276303f139fa052bfee"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
