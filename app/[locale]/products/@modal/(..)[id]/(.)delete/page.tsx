import { LoadingSuspense, RouterDialog, ProductDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDeleteModal({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog key='delete-product' open onCloseBack>
      <LoadingSuspense>
        <ProductDelete.WithFetch id={id} onCloseBack />
      </LoadingSuspense>
    </RouterDialog>
  );
}
