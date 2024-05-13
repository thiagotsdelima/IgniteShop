import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { BagButton } from '../BagButton';
import { MenuContent } from '../MenuContent';
import { Badge } from '../badge';

interface ForwardedBagButtonProps {
  bagQuantity: number;
}

const ForwardedBagButton = forwardRef<HTMLDivElement>((props: ForwardedBagButtonProps, ref) => (
  <div style={{ position: 'relative' }}>
    <BagButton {...props} />
    {props.bagQuantity > 0 && <Badge count={props.bagQuantity} />}
  </div>
));

interface MenuHamburguerProps {
  bagQuantity: number;
}

export function MenuHamburguer({ bagQuantity }: MenuHamburguerProps)  {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ForwardedBagButton bagQuantity={bagQuantity} />
      </Dialog.Trigger>
      <MenuContent />
    </Dialog.Root> 
  )
}