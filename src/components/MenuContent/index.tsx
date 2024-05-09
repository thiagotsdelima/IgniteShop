import * as Dialog from '@radix-ui/react-dialog';
import { Content, Overlay } from './styles';
import { CartProvider } from '@/src/hooks/Cart';
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export function MenuContent() {
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { bagItems, removeProductCart, bagTotal } = CartProvider()
  const bagQuantity = bagItems.length

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
}).format(bagTotal)

async function handleCheckout() {
  try {
      setIsCreatingCheckoutSession(true)

      const response =  await axios.post('/api/checkout', {
          products: bagItems
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl

  } catch (error) {
      setIsCreatingCheckoutSession(false)
      alert('Failed to redirect checkout!')
  }
}

  return (
    <Dialog.Portal>
    <Overlay />
    <Content>
      <Dialog.Close />
      <Dialog.Title>Bag of Shopping</Dialog.Title>
      <main>
      {bagQuantity <= 0 && <p>It looks like your cart is empty : </p>}
      {bagItems.map(bagItems => (
                            <Product key={bagItems.id}>
                                <ProductImage>
                                    <Image width={100} height={93} alt="" src={bagItems.imageUrl}/>
                                </ProductImage>
                                <ProductDetails>
                                    <p>{bagItems.name}</p>
                                    <strong>{bagItems.price}</strong>

                                    <button onClick={() => removeProductCart(bagItems.id)}>Remove</button>
                                </ProductDetails>
                            </Product>
                        ))}
      </main>
                     <Finalization>
                        <FinalizationDetails>
                            <div>
                                <span>Amount</span>
                                <p>{bagQuantity} {bagQuantity === 1 ? 'item' : 'itens'}</p>
                            </div>
                            <div>
                                <span>Amount Total</span>
                                <p>{formattedTotal}</p>
                            </div>
                        </FinalizationDetails>
                        <button onClick={handleCheckout} disabled={isCreatingCheckoutSession || bagQuantity <= 0}>Finalize purchase</button>
                    </Finalization>
    </Content>
  </Dialog.Portal>
  )
}