import firebase from 'firebase/app';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyDSFR1Ad7z5HqqxRvKvTyjJbwEmYbxMwz8",
    authDomain: "grant-skinner-project-3.firebaseapp.com",
    projectId: "grant-skinner-project-3",
    storageBucket: "grant-skinner-project-3.appspot.com",
    messagingSenderId: "647628518887",
    appId: "1:647628518887:web:cf1aee01db2fa85198f942"
  };

  firebase.initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export default firebase;