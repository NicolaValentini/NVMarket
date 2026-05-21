import { LoadingSuspense, RouterDialog, PriceForm } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PriceEditModal({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog key='edit-price' open onCloseBack>
      <LoadingSuspense>
        <PriceForm.WithFetch id={id} onCloseBack />
      </LoadingSuspense>
    </RouterDialog>
  );
}
