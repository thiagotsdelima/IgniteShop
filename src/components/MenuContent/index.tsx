import { useContext, useState, useEffect } from 'react'
import { shopCartContext } from '../../context/shopCartContext'

import { X } from 'phosphor-react'

import * as Dialog from '@radix-ui/react-dialog';

import Image from 'next/image'
import axios from 'axios'
import { ItmsContent, Product, ProductImage, ProductDetails, Finalization, FinalizationDetails, Title, Close } from './styles';

export function MenuContent() {
  const {shopCart:{shopCartList},removeItem} = useContext(shopCartContext)
  const [totalPrice, setTotalPrice] = useState('')

  const [isCreatingCheckoutSession,setIsCreatingCheckoutSession] = useState(false)

  async function handleBuyButton() {
    try {
      const priceId = shopCartList.map(item =>{
        return {
          price: item.defaultPriceId,
          quantity:1

        }
      })
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        priceId
      })

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);

      alert('Falha ao redirecionar ao checkout!')
    }
  }


  function handleRemoveItem(id:string){
    removeItem(id)
  }
  
  useEffect(()=>{
    function handleQuantity(){
      const soma = shopCartList.reduce((acc, cv) => acc + Number(cv.price.split('$')[1].replace(',','.')),0)
  
  
      const finalPrice = new Intl.NumberFormat('pt-BR',{
        style:'currency',
        currency:'BRL',
      }).format(soma)
  
      setTotalPrice(finalPrice)
    }
    handleQuantity()
  },[shopCartList])

  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <ItmsContent>
        <Close>
          <X size={32} />
        </Close>
        <Title>Bag of Shopping</Title>
        <main>
          {shopCartList.length > 0 ?    
          shopCartList.map((product) => {
              return (
                <Product key={sku}>
                  <ProductImage>
                    <Image width={100} height={93} alt="" src={product.imageUrl} />
                  </ProductImage>
                  <ProductDetails>
                    <p>{product.name}</p>
                    <span>{product.price}</span>
                    <button onClick={() => removeItem(product.id)}>Remove</button>
                  </ProductDetails>
                </Product>
              );
            })
          ) : (
            <p>It looks like your cart is empty.</p>
          )}
        </main>
        <Finalization>
          <FinalizationDetails>
            <div>
              <span>Amount</span>
              <p>
                {shopCartList.length} 
                {shopCartList.length === 1 ? ' item' : ' itens'}
              </p>
            </div>
            <div>
              <span>Amount Total</span>
              <p>{totalPrice}</p>
            </div>
          </FinalizationDetails>
          <button onClick={handleBuyButton} disabled={isCreatingCheckoutSession}>Finalize purchase</button>
        </Finalization>
      </ItmsContent>
    </Dialog.Portal>
  );
}
