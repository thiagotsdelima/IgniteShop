import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { MenuContent } from '../MenuContent';
import { BagButton } from '../BagButton';

interface MenuHamburguerProps {
  badgeComponent: React.ComponentType<{ count: number }> | null;
}

const ForwardedBagButton = forwardRef<HTMLDivElement>((props, ref) => <BagButton ref={ref} {...props} />);

export function MenuHamburguer({ badgeComponent }: MenuHamburguerProps) {
  const { cartCount } = useShoppingCart(); 

  const BadgeComponent = badgeComponent;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div style={{ position: 'relative' }}>
          <ForwardedBagButton />
          {BadgeComponent && cartCount > 0 && <BadgeComponent count={cartCount} />} 
        </div>
      </Dialog.Trigger>
      <MenuContent />
    </Dialog.Root>
  );
}
