import Head from "next/head";
import ProductForm from "../components/ProductForm";

export default function Home() {
  return (
    <>
      <Head>
        <title>ZACONNECT</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container">
        <h1 className="title display-6">WELCOME TO ZACONNECT STORE </h1>
        <ProductForm />
      </main>
    </>
  );
}
