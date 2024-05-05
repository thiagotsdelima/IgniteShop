import { ImageContainer, ProductContainer, ProductDetails } from "@/src/styles/pages/product";

export default function Product() {
  return (
   <ProductContainer>
    <ImageContainer></ImageContainer>
    <ProductDetails>
      <h1>T-shirt X</h1>
      <span>R$ 79,90</span>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias officia itaque nam et exercitationem, asperiores, obcaecati architecto id voluptatibus eaque vel non aperiam tempore? Amet optio dolore quia reiciendis iste?</p>
      <button>
        buy now
      </button>
    </ProductDetails>
   </ProductContainer>
  )
}