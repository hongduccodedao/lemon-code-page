import "@/styles/globals.scss";
import { JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
  return (
    <div className={jetbrainsMono.className}>
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  );
}
