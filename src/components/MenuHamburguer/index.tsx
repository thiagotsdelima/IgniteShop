import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { BagButton } from '../BagButton';
import { MenuContent } from '../MenuContent';

const ForwardedBagButton = forwardRef<HTMLDivElement>((props, ref) => <BagButton ref={ref} {...props} />);

interface MenuHamburguerProps {
  bagQuantity: number;
}

export function MenuHamburguer({ bagQuantity }: MenuHamburguerProps)  {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ForwardedBagButton />
      </Dialog.Trigger>
      <MenuContent />
    </Dialog.Root> 
  )
}