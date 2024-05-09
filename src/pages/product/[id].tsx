import { stripe } from "@/src/services/stripe";
import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { IProduct } from '../../contexts/BagContext'
import { CartProvider } from '../../hooks/Cart'
import Stripe from "stripe";

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const { checkItemExists, addToProductCart } = CartProvider()
  const itemInCart = checkItemExists(product.id)
  
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
      onClick={() => addToProductCart(product)}>
        {itemInCart ? 'Product is already in the cart' : 'Put it in the bag'}
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