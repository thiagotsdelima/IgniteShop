import { useContext } from "react";
import { BagContext } from "../contexts/BagContext";

export function CartProvider() {
  const bagContext = useContext(BagContext);
  
  if (!bagContext) {
    throw new Error("CartProvider must be used within a BagContextProvider");
  }
  console.log('Bag context:', bagContext);
  return bagContext;
}
