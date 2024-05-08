import * as Dialog from '@radix-ui/react-dialog';
import { BagButton } from '../BagButton';


export function MenuHamburguer() {
  return (
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <BagButton />
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Close />
            <Dialog.Title>Bag of Shopping</Dialog.Title>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
   
  )
}