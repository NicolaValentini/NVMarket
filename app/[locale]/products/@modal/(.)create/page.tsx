import { LoadingSuspense, ProductForm, RouterDialog } from '@/components';

export default function ProductCreateModal() {
  return (
    <RouterDialog key='create-product' open onCloseBack>
      <LoadingSuspense>
        <ProductForm.WithFetch onCloseBack />
      </LoadingSuspense>
    </RouterDialog>
  );
}
