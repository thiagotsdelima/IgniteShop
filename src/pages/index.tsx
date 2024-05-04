import Image from "next/image";
import { HomeContainer, Produtc } from "../styles/pages/home";

import blusa1 from '../assets/1.png'
import blusa2 from '../assets/2.png'
import blusa3 from '../assets/3.png'

export default function Home() {
  return (
    <HomeContainer>
      <Produtc>
        <Image src={blusa1} width={520} height={480} alt="" />
        <footer>
          <strong>T-shirt X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Produtc>
      <Produtc>
        <Image src={blusa2} width={520} height={480} alt="" />
        <footer>
          <strong>T-shirt X</strong>
          <span>R$ 79,90</span>
        </footer>
      </Produtc>
    </HomeContainer>
  );
}
