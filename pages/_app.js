import UserProvider, { useUser } from "../context/userContext";
import Progress from "nextjs-progressbar";
import { auth } from "../firebase";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

import { store, persistor } from "../store";

import Navbar from "../components/Navbar";

import "../styles/global.css";
import { userAuthed } from "../store/users";

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Listen authenticated user
    const unsubscriber = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          // User is signed in.
          const { uid, displayName, email, photoURL } = user;
          // You could also look for the user doc in your Firestore (if you have one):
          await save_user(user);
          // const userDoc = await firebase.firestore().doc(`users/${uid}`).get()
          dispatch(userAuthed({ uid, displayName, email, photoURL }));
        } else setUser(null);
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
        console.error(error.message);
      } finally {
        setLoadingUser(false);
      }
    });

    return () => unsubscriber();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root component={Component} pageProps={pageProps} />
      </PersistGate>
    </Provider>
  );
}

const Root = ({ component: Component, pageProps }) => {
  const { loadingUser } = useUser();

  if (loadingUser)
    return (
      <div className="d-flex vh-75 justify-content-center align-items-center">
        <div className="spinner-border w-2">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  return (
    <>
      <Progress />
      <Navbar />
      <div className="container my-3">
        <Component {...pageProps} />
      </div>
    </>
  );
};
