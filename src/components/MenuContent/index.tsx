import * as Dialog from '@radix-ui/react-dialog';
import { ItmsContent, Product, ProductImage, ProductDetails, Finalization, FinalizationDetails, Title, Close } from './styles';
import { useContext } from "react";
import { BagContext } from "../../contexts/BagContext";
import { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

export function MenuContent() {
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { bagItems, removeProductCart, bagTotal } = useContext(BagContext);
  const bagQuantity = bagItems ? bagItems.length : 0;

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
    <Dialog.Overlay />
    <ItmsContent>
      <Close />
      <Title>Bag of Shopping</Title>
        <main>
            {bagItems && bagItems.length > 0 ? (
                bagItems.map((bagItem) => (
                <Product key={bagItem.id}>
                    <ProductImage>
                    <Image width={100} height={93} alt="" src={bagItem.imageUrl} />
                    </ProductImage>
                    <ProductDetails>
                    <p>{bagItem.name}</p>
                    <strong>{bagItem.price}</strong>
                    <button onClick={() => removeProductCart(bagItem.id)}>Remove</button>
                    </ProductDetails>
                </Product>
                ))
            ) : (
                <p>It looks like your cart is empty.</p>
            )}
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
    </ItmsContent>
  </Dialog.Portal>
  )
}