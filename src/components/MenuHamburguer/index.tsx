import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { BagButton } from '../BagButton';
import { MenuContent } from '../MenuContent';

const ForwardedBagButton = forwardRef((props, ref) => <BagButton ref={ref} {...props} />);

export function MenuHamburguer() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <ForwardedBagButton />
      </Dialog.Trigger>
      <MenuContent />
    </Dialog.Root> 
  )
}
