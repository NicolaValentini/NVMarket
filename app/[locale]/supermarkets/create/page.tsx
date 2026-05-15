import { RouterDialog, SupermarketForm } from '@/components';

export default function SupermarketCreatePage() {
  return (
    <RouterDialog open onCloseRedirect='./'>
      <SupermarketForm onCloseRedirect='./' />
    </RouterDialog>
  );
}
