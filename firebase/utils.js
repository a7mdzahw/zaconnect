import { toast } from "react-toastify";
import firebase, { auth, db } from "./index";

// AUTH
export const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
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

export const upload = (task, onUpload, onError, onFinish) => {
  task.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      onUpload(progress);
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      onError(error);
    },
    () => {
      task.snapshot.ref.getDownloadURL().then((downloadURL) => {
        onFinish(downloadURL);
      });
    }
  );
};
