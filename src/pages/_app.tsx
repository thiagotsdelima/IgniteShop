import type { AppProps } from "next/app";
import { globolStyles } from "../styles/global";
import logoImg from '../assets/logo.svg'
import { Container, Header } from '../styles/pages/app'

globolStyles()
export default function App({ Component, pageProps }: AppProps) {
  return (
   <Container>
    <Header>
      <img src={logoImg.src} alt="" />
    </Header>
     <Component {...pageProps} />
   </Container>
  )
}
