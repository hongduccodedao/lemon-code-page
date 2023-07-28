import '@/styles/globals.scss'
import { JetBrains_Mono } from "next/font/google"

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
})

export default function App({ Component, pageProps }) {
  return (
    <div className={jetbrainsMono.className}>
      <Component {...pageProps} />
    </div>
  );
}
