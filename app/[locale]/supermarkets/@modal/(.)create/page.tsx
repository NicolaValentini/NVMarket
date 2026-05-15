import { RouterDialog, SupermarketForm } from '@/components';

export default function SupermarketCreateModal() {
  return (
    <RouterDialog key='create-supermarket' open onCloseBack>
      <SupermarketForm onCloseBack />
    </RouterDialog>
  );
}
