import { db, storage } from "./index";

export const ref = db.collection("products");

export const getByUrl = async (url) => {
  const data = [];
  const snap = await ref.where("photoURL", "==", url).get();
  snap.forEach((doc) => data.push(doc.id));
  return data[0];
};

export const get_all = async () => {
  const list = [];
  const coll = await ref.get();
  await coll.forEach((doc) => list.push(doc.data()));
  return list;
};

export const create = async (product) => {
  await ref.add(product);
};

export const image = (file) => {
  const storageRef = storage.ref();
  return storageRef.child(`products/${file.name}-${Date.now()}.jpg`).put(file);
};

export const remove = async (product) => {
  const id = await getByUrl(product.photoURL);
  await ref.doc(`${id}`).delete();
};
