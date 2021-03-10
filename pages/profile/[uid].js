import Head from "next/head";
import router from "next/router";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "../../firebase";

export default function Profile({ user, error }) {
  const { isAuth } = useSelector((state) => state.users);

  useEffect(() => {
    if (!isAuth) router.push("/");
  }, [isAuth]);

  return (
    <div className="container">
      <Head>
        <title>PROFILE</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="d-flex flex-column align-items-center">
        {user ? (
          <>
            <h1 className="title display-3">WELCOME BACK</h1>
            <h2 className="display-4">{user.displayName}</h2>
            <p className="text-muted">{user.email}</p>
            <img src={user.photoURL} alt="item" className="img-fluid" />
          </>
        ) : (
          <h1 className="title text-danger display-3">ERROR : {error} </h1>
        )}
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  const { uid } = params;
  try {
    const userRef = await db.doc(`users/${uid}`).get();
    const user = userRef.data();
    return { props: { user } };
  } catch (ex) {
    return {
      props: {
        user: null,
        error: ex.message,
      },
    };
  }
};
