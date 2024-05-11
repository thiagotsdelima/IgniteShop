import { Handbag } from "phosphor-react";
import { BagConteiner } from "./styles";
import { ComponentProps, forwardRef } from "react";

type BagProps = ComponentProps<typeof BagConteiner>

export const BagButton = forwardRef<HTMLDivElement, BagProps>((props, ref) => {
  return (
    <BagConteiner ref={ref} {...props}>
      <Handbag weight="bold" />
    </BagConteiner>
  );
});
