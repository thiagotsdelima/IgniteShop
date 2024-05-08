import { createContext, ReactNode, useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface BagContextData {
  bagItems: IProduct[];
  addToProductCart: (product: IProduct) => void;
  checkItemExists: (productId: string) => boolean;
  removeProductCart: (productId: string) => void;
  bagTotal: number;
}

interface BagContextProviderProps {
  children: ReactNode;
}

export const BagContext = createContext({} as BagContextData);

export function BagContextProvider({ children }: BagContextProviderProps) {
  const [bagItems, setBagItems] = useState<IProduct[]>([]);

  const bagTotal = bagItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);

  function addToProductCart(product: IProduct) {
    setBagItems(state => [...state, product]);
  }

  function removeProductCart(productId: string) {
    setBagItems(state => state.filter(item => item.id !== productId));
  }

  function checkItemExists(productId: string) {
    return bagItems.some(product => product.id === productId);
  }

  return (
    <BagContext.Provider value={{ bagItems: bagItems, addToProductCart, checkItemExists, removeProductCart, bagTotal }}>
      {children}
    </BagContext.Provider>
  );
}
