import { db, storage } from "./index";

const ref = db.collection("products");

export const get_all = async () => {
  const list = [];
  const coll = await ref.get();
  await coll.forEach((doc) => list.push(doc.data()));
  return list;
};

export const create = async (product) => {
  await ref.add(product);
};

export const image = async (file) => {
  const storageRef = storage.ref();
  const imageFile = storageRef.child(`products/${Date.now()}.jpg`);
  await imageFile.put(file);
  const url = await imageFile.getDownloadURL();
  return url;
};
