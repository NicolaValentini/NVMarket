import { LoadingSuspense, PriceForm, RouterDialog } from '@/components';

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function PriceCreateModal({ params }: Props) {
  const { productId } = await params;

  return (
    <RouterDialog key='create-price' open onCloseBack>
      <LoadingSuspense>
        <PriceForm.WithFetch productId={productId} onCloseBack />
      </LoadingSuspense>
    </RouterDialog>
  );
}
