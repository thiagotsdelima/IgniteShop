import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef, useContext } from 'react';
import { BagContext } from '../../contexts/BagContext'
import { MenuContent } from '../MenuContent';

interface MenuHamburguerProps {
  badgeComponent: React.ComponentType<{ count: number }> | null;
}

import { BagButton } from '../BagButton';
const ForwardedBagButton = forwardRef<HTMLDivElement>((props, ref) => <BagButton ref={ref} {...props} />);


export function MenuHamburguer({ badgeComponent }: MenuHamburguerProps) {
  const { bagItems } = useContext(BagContext);
  const bagQuantity = bagItems ? bagItems.length : 0;
  const BadgeComponent = badgeComponent; 

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div style={{ position: 'relative' }}>
          <ForwardedBagButton />
          {BadgeComponent && bagQuantity > 0 && <BadgeComponent count={bagQuantity} />}
        </div>
      </Dialog.Trigger>
      <MenuContent />
    </Dialog.Root>
  );
}
