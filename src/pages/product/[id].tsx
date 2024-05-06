import { stripe } from "@/src/services/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useState } from "react";
import Stripe from "stripe";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl: string;
    price: string;
    description: string | null; 
    defaultPriceId: string;
  }
}

export default function Product({ product }: ProductProps) {
  // const router = useRouter() // aplicacao interna
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })
      const { checkoutUrl } = response.data;
     // router.push('/checkout') // aplicacao interna
      window.location.href = checkoutUrl // se usar a opcao acima retiro essa
    } catch(err) {
      setIsCreatingCheckoutSession(false);
      alert('Failed to redirect checkout')
    }
  }
  return (
   <ProductContainer>
    <ImageContainer>
      <Image src={product.imageUrl} width={520} height={480} alt="" />
    </ImageContainer>
    <ProductDetails>
      <h1>{product.name}</h1>
      <span>{product.price}</span>
      <p>{product.description}</p>
      <button disabled={isCreatingCheckoutSession} onClick={handleBuyProduct}>
        buy now
      </button>
    </ProductDetails>
   </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id: 'prod_Q2xsa22JHGWyCD'}}
    ],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async ({ params }) => {
  const productId = params?.id as string;
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  });
  const price = product.default_price as Stripe.Price;
  const unitAmount = price?.unit_amount ?? 0;
  return {
    props: {
      product: {
          id: product.id,
          name: product.name,
          imageUrl: product.images[0],
          price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(unitAmount / 100),
        description: product.description,
        defaultPriceId: price.id,
      }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  };
}