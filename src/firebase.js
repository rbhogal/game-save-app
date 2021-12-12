// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD_K5iitEPS5fKiHBMvxtyefoSZVmX3Tck',
  authDomain: 'game-save.firebaseapp.com',
  databaseURL: 'https://game-save-default-rtdb.firebaseio.com',
  projectId: 'game-save',
  storageBucket: 'game-save.appspot.com',
  messagingSenderId: '711933461290',
  appId: '1:711933461290:web:ed88e0dfd46c24a8679453',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export { auth, provider };
