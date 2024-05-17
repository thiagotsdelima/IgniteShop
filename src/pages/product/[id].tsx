import { stripe } from "@/src/services/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { useShoppingCart } from 'use-shopping-cart'
import Stripe from "stripe";
import { useState } from "react";

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
    sku: string
  }
}

export default function Product({ product }: ProductProps) {
  const { addItem, cartDetails } = useShoppingCart()
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false)

  const itemInCart = cartDetails.hasOwnProperty(product.id)

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckout(true)
      await addItem(product)
    } catch (error) {
      setIsCreatingCheckout(false)
      alert(`Failed to add item to cart`)
    }
  }
  
  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
    
   <ProductContainer>
    <ImageContainer>
      <Image src={product.imageUrl} width={520} height={480} alt="" />
    </ImageContainer>
    <ProductDetails>
      <h1>{product.name}</h1>
      <span>{product.price}</span>
      <p>{product.description}</p>
      <button 
      disabled={itemInCart} 
      onClick={handleBuyProduct}>
        {itemInCart ? 'Product is already in the cart' : 'Add to Cart'}
      </button>
    </ProductDetails>
   </ProductContainer>
   </>
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
  const sku = product.metadata?.sku ?? null;
  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format((price.unit_amount || 0) / 100),
      description: product.description,
      defaultPriceId: price.id,
      sku: sku
    }
    },
    revalidate: 60 * 60 * 1 // 1 hour
  };
}
