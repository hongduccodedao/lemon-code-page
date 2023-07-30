import "@/styles/globals.scss";
import { JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className={jetbrainsMono.className}>
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}
