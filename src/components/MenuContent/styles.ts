import { styled } from "../../styles";
import * as Dialog from "@radix-ui/react-dialog";


export const ItmsContent = styled(Dialog.Content, {
  position: "fixed",
  top: 0,
  right: 0,
  bottom: 0,
  width: "30rem",
  background: "$gray800",
  padding: "3rem",
  paddingTop: "4.5rem",
  boxShadow: "-4px 0px 30px rgba(0, 0, 0, 0.8)",
  display: "flex",
  flexDirection: "column",

})

export const Product = styled('div', {})

export const ProductImage = styled('div', {})
export const ProductDetails = styled('div', {})
export const Finalization = styled('div', {})
export const FinalizationDetails = styled('div', {})