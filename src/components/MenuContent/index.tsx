import axios from 'axios';
import * as Dialog from '@radix-ui/react-dialog';
import { ItmsContent, Product, ProductImage, ProductDetails, Finalization, FinalizationDetails, Title, Close } from './styles';
import { CartProvider } from '../../hooks/cart'
import { useState } from 'react';
import { X } from 'phosphor-react'
import Image from 'next/image';

interface ItemCart{
  id: string,
  img?: string,
  name: string,
  price: number,
  quantity: number,
}


export function MenuContent() {
  const [itemCart, setItemCart] = useState<ItemCart[]>([])
  const [ isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  const { bagItems, removeProductCart, bagTotal } = CartProvider()
  const bagQuantity = bagItems ? bagItems.length : 0;

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(bagTotal);

  function clearCart() {
    setItemCart([]); 
  }

  async function handleCheckout() {
    try {
        const itemsToSend = itemCart.map(({ id, quantity }) => ({ id, quantity }));
        const response = await axios.post('/api/checkout', {
           items: itemsToSend
        })

        const { checkoutUrl } = response.data;
        window.location.href = checkoutUrl;
    } catch (err) {
        console.error('Error during checkout:', err);
        alert('Failed to redirect to checkout!');
    }

    setIsCreatingCheckoutSession(true);
    clearCart();
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