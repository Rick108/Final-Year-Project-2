import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBDAt2jpAjLQ7O5tfAXZSEFrNqXnX2xLss',
  authDomain: 'final-year-project-2-5b8b6.firebaseapp.com',
  projectId: 'final-year-project-2-5b8b6',
  storageBucket: 'final-year-project-2-5b8b6.appspot.com',
  messagingSenderId: '123667864317',
  appId: '1:123667864317:web:a04368bd7ec922b0407c94'
};

firebase.initializeApp(firebaseConfig);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  if (!userSnapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error while creating user:', error);
    }
  }

  return userRef;
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth);
    }, reject);
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export default firebase;
