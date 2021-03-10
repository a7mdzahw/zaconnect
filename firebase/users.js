import { db, storage } from "./index";

export const getUsers = async () => {
  const usersRef = db.collection("users");
  const collection = await usersRef.get();
  const data = [];
  collection.forEach((doc) => data.push(doc.data()));
  return data;
};

export const image = (file) => {
  const ref = storage.ref();
  return ref.child(`users/${file.name}-${Date.now()}.jpg`).put(file);
};
