import firebase, { auth, db } from "./index";

// AUTH
export const loginWithGoogle = async () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  await auth.signInWithPopup(provider);
};

export const signOut = async () => {
  await auth.signOut();
};

export const save_user = async (user) => {
  const userRef = db.doc(`users/${user.uid}`);
  const userSnap = await userRef.get();

  if (userSnap.exists) return userRef;

  await userRef.set({
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  });

  return userRef;
};
