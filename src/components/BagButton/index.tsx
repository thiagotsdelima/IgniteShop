import { Handbag } from "phosphor-react";
import { BagConteiner } from "./styles";
import { ComponentProps } from "react";

type BagProps = ComponentProps<typeof BagConteiner>

export function BagButton({ ...rest }: BagProps) {
  return (
    <BagConteiner>
        <Handbag weight="bold" />
    </BagConteiner>
  )
}