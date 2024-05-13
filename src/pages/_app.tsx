import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container, Header } from '../styles/pages/app'
import { MenuHamburguer } from "../components/MenuHamburguer";
import { BagContext, BagContextProvider } from '../contexts/BagContext'
import { useRouter } from "next/router";
import logoImg from '../assets/logo.svg'
import Image from "next/image";
import { useContext } from "react";
import { Badge } from '../components/badge'

globalStyles(); 

export default function App({ Component, pageProps }: AppProps) {
  const { bagItems } = useContext(BagContext);
  const bagQuantity = bagItems ? bagItems.length : 0;

  const { pathname } = useRouter()
  const showCart = pathname !== '/success'

  return (
    <BagContextProvider>
      <Container>
        <Header>
          <Image src={logoImg} alt="" /> 
          {showCart && <MenuHamburguer bagQuantity={bagQuantity} />}
          {showCart && <Badge count={bagQuantity} />}
        </Header>
        <Component {...pageProps} />
      </Container>
   </BagContextProvider>
  )
}