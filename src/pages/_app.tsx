import type { AppProps } from "next/app";
import { globalStyles } from "../styles/global";
import { Container, Header } from '../styles/pages/app'
import { MenuHamburguer } from "../components/MenuHamburguer";
import { CartProvider } from 'use-shopping-cart'
import { useRouter } from "next/router";
import logoImg from '../assets/logo.svg'
import Image from "next/image";
import { Badge } from '../components/badge'

globalStyles(); 
const stripeKey = process.env.STRIPE_PUBLIC_KEY

export default function App({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter()
  const showCart = pathname !== '/success'

  return (
    <CartProvider
    shouldPersist
    cartMode="checkout-session"
    stripe={String(stripeKey)}
    currency="BRL"
  >
      <Container>
        <Header>
          <Image src={logoImg} alt="" /> 
          {showCart && (
          <MenuHamburguer badgeComponent={Badge} />
          )}
        </Header>
        <Component {...pageProps} />
      </Container>
   </CartProvider>
  )
}