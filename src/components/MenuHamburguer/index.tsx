import * as Dialog from '@radix-ui/react-dialog';
import { BagButton } from '../BagButton';
import { MenuContent } from '../MenuContent';



export function MenuHamburguer() {
  return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <BagButton />
        </Dialog.Trigger>
      <MenuContent />
      </Dialog.Root>
   
  )
}
