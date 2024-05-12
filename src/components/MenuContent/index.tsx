import * as Dialog from '@radix-ui/react-dialog';
import { ItmsContent, Product, ProductImage, ProductDetails, Finalization, FinalizationDetails, Title, Close } from './styles';
import { useContext } from "react";
import { BagContext } from "../../contexts/BagContext";
import { useState } from 'react';
import { X } from 'phosphor-react'
import Image from 'next/image';
import axios from 'axios';

export function MenuContent() {
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { bagItems, removeProductCart, bagTotal } = useContext(BagContext);
  const bagQuantity = bagItems ? bagItems.length : 0;

  console.log("Total do carrinho antes da formatação:", bagTotal);
  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(bagTotal);
  console.log("Total do carrinho após a formatação:", formattedTotal);
  

async function handleCheckout(){
  try {
      setIsCreatingCheckoutSession(true);
      const response = await axios.post('/api/checkout', {
        pricesIds: bagItems.map(product => {
          return product.defaultPriceId
        })
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl;
    } catch (err) {
      setIsCreatingCheckoutSession(false);
      alert('Failed to redirect to checkout!');
    }
}

  return (
    <Dialog.Portal>
    <Dialog.Overlay />
    <ItmsContent>
      <Close>
      <X  size={32}/>
      </Close>
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