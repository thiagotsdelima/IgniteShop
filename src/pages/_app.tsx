import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container, Header } from '../styles/pages/app'
import { MenuHamburguer } from "../components/MenuHamburguer";
import { useRouter } from "next/router";
import logoImg from '../assets/logo.svg'
import Image from "next/image";

globalStyles(); 

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const showCart = pathname !== '/success'
  return (
   <Container>
    <Header>
      <Image src={logoImg} alt="" /> 
      {showCart && <MenuHamburguer/>}
    </Header>
     <Component {...pageProps} />
   </Container>
  )
}
