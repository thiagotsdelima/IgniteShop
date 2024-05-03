import type { AppProps } from "next/app";
import { globolStyles } from "../styles/global";
import logoImg from '../assets/logo.svg'

globolStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
   <div>
    <header>
      <img src={logoImg.src} alt="" />
    </header>
     <Component {...pageProps} />
   </div>
  )
}
