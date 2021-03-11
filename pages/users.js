import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { getUsers } from "../firebase/users";
import { usersRecieved } from "../store/users";

const users = () => {
  const dispatch = useDispatch();
  const { list: users, list_loading } = useSelector((state) => state.users);

  const get_users = async () => {
    const users = await getUsers();
    dispatch(usersRecieved(users));
  };

  React.useEffect(() => {
    get_users();
  }, []);

  if (list_loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-75">
        <Spinner variant="success" animation="grow" />
      </div>
    );
  return (
    <div>
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
