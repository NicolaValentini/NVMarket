import { LoadingSuspense, RouterDialog, ProductForm } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductEditModal({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog key='edit-product' open onCloseBack>
      <LoadingSuspense>
        <ProductForm.WithFetch id={id} onCloseBack />
      </LoadingSuspense>
    </RouterDialog>
  );
}
