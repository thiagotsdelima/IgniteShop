import * as Dialog from '@radix-ui/react-dialog';
import { forwardRef } from 'react';
import { BagButton } from '../BagButton';
import { MenuContent } from '../MenuContent';

const ForwardedBagButton = forwardRef<HTMLDivElement>((props, ref) => <BagButton ref={ref} {...props} />);

interface MenuHamburguerProps {
  bagQuantity: number;
  badgeComponent: React.ComponentType<{ count: number }> | null;
}

export function MenuHamburguer({ bagQuantity, badgeComponent }: MenuHamburguerProps) {
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