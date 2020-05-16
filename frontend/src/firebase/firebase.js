import app from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyCOn8CINpc1usfeZ9yh1nY5j76XViT4jm4",
  authDomain: "ru-hacks-85f40.firebaseapp.com",
  databaseURL: "https://ru-hacks-85f40.firebaseio.com",
  projectId: "ru-hacks-85f40",
  storageBucket: "ru-hacks-85f40.appspot.com",
  messagingSenderId: "719594252891",
  appId: "1:719594252891:web:01f245a1f73cb2a3896d7e",
  measurementId: "G-0Y0178S941"
};


class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);

    this.db = app.database();
    this.auth = app.auth();
  }

  // *** Auth API ***
  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signOut = () => this.auth.signOut();

  sendPasswordResetEmail = email => this.auth.sendPasswordResetEmail(email);

  updatePassword = password => this.auth.currentUser.updatePassword(password);

  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(user => {
      if (user) {
        this.user(user.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            next({
              uid: user.uid,
              email: user.email,
              ...dbUser,
            });
          });
      } else {
        fallback();
      }
    });


  // *** User API ***
  user = uid => this.db.ref(`/users/${uid}`);

  users = () => this.db.ref(`users`);
}

export default Firebase;