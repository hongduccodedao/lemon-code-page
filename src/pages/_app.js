import "@/styles/globals.scss";
import { JetBrains_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/redux";
import { SEO } from "@/components/seo";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <div className={jetbrainsMono.className}>
            <SEO
              title="Lemon Code??"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum."
            />
            <Component {...pageProps} />
            <ToastContainer />
          </div>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}
