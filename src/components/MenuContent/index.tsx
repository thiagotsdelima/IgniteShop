import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { X } from 'phosphor-react';
import Image from 'next/image';
import axios from 'axios';
import { useShoppingCart } from 'use-shopping-cart';
import { ItmsContent, Product, ProductImage, ProductDetails, Finalization, FinalizationDetails, Title, Close } from './styles';

interface ItemCart {
  id: string;
  img?: string;
  name: string;
  price: number;
  quantity?: number;
}

export function MenuContent() {
  const { cartCount, cartDetails, removeItem, clearCart } = useShoppingCart(); 

  const [itemCart, setItemCart] = useState<ItemCart[]>([]);
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
  const [stateCart, setStateCart] = useState(true);

  const formattedTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format((cartCount || 0) / 100);

  useEffect(() => {
    if (cartCount! > 0) {
      setStateCart(false);
    } else {
      setStateCart(true);
    }

    const itemsArray = Object.keys(cartDetails!).map((itemId) => {
      const item = cartDetails![itemId];
      const itemCartObj: ItemCart = {
        id: item.id,
        img: item.image,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      };
      return itemCartObj;
    });

    setItemCart(itemsArray);
  }, [cartCount]);

  async function handleCheckout() {
    try {
      const itemsToSend = itemCart.map(({ id, quantity }) => ({ id, quantity }));
      const response = await axios.post('/api/checkout', {
        items: itemsToSend
      });

      const { checkoutUrl } = response.data;
      window.location.href = checkoutUrl;
    } catch (err) {
      alert(err);
    }

    setIsCreatingCheckoutSession(true);
    clearCart();
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <ItmsContent>
        <Close>
          <X size={32} />
        </Close>
        <Title>Bag of Shopping</Title>
        <main>
          {cartDetails && Object.keys(cartDetails).length > 0 ? (
            Object.keys(cartDetails).map((sku) => {
              const product = cartDetails[sku];
              return (
                <Product key={sku}>
                  <ProductImage>
                    <Image width={100} height={93} alt="" src={product.imageUrl} />
                  </ProductImage>
                  <ProductDetails>
                    <p>{product.name}</p>
                    <strong>{product.formattedValue}</strong>
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
              <p>{cartCount}</p>
            </div>
            <div>
              <span>Amount Total</span>
              <p>{formattedTotal}</p>
            </div>
          </FinalizationDetails>
          <button onClick={handleCheckout} disabled={cartCount === 0}>Finalize purchase</button>
        </Finalization>
      </ItmsContent>
    </Dialog.Portal>
  );
}
