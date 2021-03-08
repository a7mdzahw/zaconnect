import UserProvider from "../context/userContext";
import Progress from "nextjs-progressbar";

import Navbar from "../components/Navbar";

import "../styles/global.css";

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Progress />
      <Navbar />
      <div className="container my-3">
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
