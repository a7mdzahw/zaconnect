import { useEffect } from "react";
import Progress from "nextjs-progressbar";

import { ToastContainer } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { save_user } from "../firebase/utils";

import { auth } from "../firebase";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "../store";
import { userAuthed } from "../store/users";

import Navbar from "../components/Navbar";

import "../styles/global.css";

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Root component={Component} pageProps={pageProps} />
      </PersistGate>
    </Provider>
  );
}

const Root = ({ component: Component, pageProps }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscriber = auth.onAuthStateChanged(async (user) => {
      try {
        if (user) {
          const userRef = await save_user(user);
          const userDoc = (await userRef.get()).data();
          dispatch(userAuthed(userDoc));
        } else dispatch(userAuthed(null));
      } catch (error) {
        console.error(error.message);
      }
    });

    return () => unsubscriber();
  }, []);

  const { loading } = useSelector((state) => state.users);

  if (loading)
    return (
      <div className="d-flex vh-75 justify-content-center align-items-center">
        <div className="spinner-border w-2">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  return (
    <>
      <Progress options={{ showSpinner: false }} />
      <Navbar />
      <ToastContainer />
      <div className="container my-3">
        <Component {...pageProps} />
      </div>
    </>
  );
};
