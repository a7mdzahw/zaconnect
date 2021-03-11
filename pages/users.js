import React from "react";
import Head from "next/head";
import router from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getUsers } from "../firebase/users";
import { usersRecieved } from "../store/users";

const users = () => {
  const dispatch = useDispatch();
  const { list: users, list_loading, isAuth } = useSelector((state) => state.users);

  const get_users = async () => {
    const users = await getUsers();
    dispatch(usersRecieved(users));
  };

  React.useEffect(() => {
    if (!isAuth) router.push("/login");
    get_users();
  }, []);

  if (!isAuth) return null;

  if (list_loading)
    return (
      <>
        <Head>
          <title>USERS</title>
        </Head>
        <div className="d-flex justify-content-center align-items-center vh-75">
          <Spinner variant="success" animation="grow" />
        </div>
      </>
    );
  return (
    <div>
      <Head>
        <title>USERS</title>
      </Head>
      {users.map((user) => (
        <UserCard key={user.uid} user={user} />
      ))}
    </div>
  );
};

const UserCard = ({ user }) => {
  return (
    <>
      <div className="card m-2">
        <div className="card-body d-flex gap-2">
          <img src={user.photoURL} alt={user.displayName} style={{ width: 96, height: 96 }} />
          <div className="text-info mx-4">
            <h2>{user.displayName}</h2>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default users;
