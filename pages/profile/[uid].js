import Head from "next/head";
import router from "next/router";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { db } from "../../firebase";
import { toast } from "react-toastify";

export default function Profile({ user, error }) {
  const { isAuth } = useSelector((state) => state.users);

  const deleteAccount = async () => {
    const user = auth.currentUser;
    const yes = prompt("Please Enter 'yes'");
    if (yes != "yes") return;
    try {
      await user.delete();
      toast.warning("ACCOUNT DELETED");
    } catch (error) {
      alert(error);
    }
  };

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
            <div className="d-flex justify-content-center gap-5">
              <div>
                <h2 className="display-6">{user.displayName}</h2>
                <p className="text-muted">{user.email}</p>
              </div>
              <img src={user.photoURL} alt="item" className="img-fluid w-75" />
            </div>
          </>
        ) : (
          <h1 className="title text-danger display-3">ERROR : {error} </h1>
        )}
        <button className="btn btn-danger mt-4" onClick={deleteAccount}>
          <i className="bi bi-trash"></i> DELETE ACCOUNT
        </button>
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
