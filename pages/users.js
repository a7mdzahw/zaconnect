import React from "react";
import { getUsers } from "../firebase/users";

const users = ({ users }) => {
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
          <img
            src={user.photoURL}
            alt={user.displayName}
            style={{ width: 96, height: 96 }}
          />
          <div className="text-info mx-4">
            <h2>{user.displayName}</h2>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const users = await getUsers();
  return { props: { users } };
};

export default users;
