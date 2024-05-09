import Image from "next/image";
import { HomeContainer, Product } from "../styles/pages/home";
import { useKeenSlider } from 'keen-slider/react';
import { stripe } from "../services/stripe";
import { GetStaticProps } from "next";
import { BagButton } from '../components/BagButton'
import { IProduct } from '../contexts/BagContext'
import { CartProvider } from '../hooks/Cart'
import 'keen-slider/keen-slider.min.css';
import Stripe from "stripe";
import Link from "next/link";
import Head from "next/head";
import { MouseEvent } from "react";

interface HomeProps {
  products: IProduct[]
}

export default function Home({ products }: HomeProps) {
  const { checkItemExists, addToProductCart  } = CartProvider()
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  });

  function handleaAddToProductCart(e: MouseEvent<HTMLButtonElement>, product: IProduct) {
    e.preventDefault()
    addToProductCart(product)
  }


  return (
    <>
       <Head>
        <title>Home | Ignite Shop</title>
       </Head>
    
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products.map(product => {
        return (
          <Link key={product.id} href={`/product/${product.id}`} prefetch={false}>
          <Product className="keen-slider__slide">
            <Image src={product.imageUrl} width={520} height={480} alt="" />
              <footer>
              <strong>{product.name}</strong>
              <span>{product.price}</span>
              <BagButton 
                    onClick={(e) => handleaAddToProductCart(e, product)}
                    disabled={checkItemExists(product.id)}
                />
              </footer>
          </Product>
          </Link>
        )
      })}
    </HomeContainer>
    </>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  });

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price;
    const unitAmount = price?.unit_amount ?? 0;
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      url: product.url,
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(unitAmount / 100),
    };
  });

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // aqui a cada 2hr cria um nova page static
  };
};
