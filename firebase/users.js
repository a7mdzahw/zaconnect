import { db } from "./index";

export const getUsers = async () => {
  const usersRef = db.collection("users");
  const collection = await usersRef.get();
  const data = [];
  collection.forEach((doc) => data.push(doc.data()));
  return data;
};
