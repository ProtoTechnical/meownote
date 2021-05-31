import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
   apiKey: 'AIzaSyAWTex70VjnB0t7jGvDxLKQdsKnwuJZU7g',
   authDomain: 'notesy-c7206.firebaseapp.com',
   databaseURL: 'https://notesy-c7206-default-rtdb.firebaseio.com/',
   projectId: 'notesy-c7206',
   storageBucket: 'gs://notesy-c7206.appspot.com',
   messagingSenderId: '270713301134',
   appId: '1:270713301134:android:26b1319462d6b4886b41df',
};

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

export { firebase };