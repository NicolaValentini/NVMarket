import { LoadingSuspense, RouterDialog, PriceDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PriceDeleteModal({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog key='delete-price' open onCloseBack>
      <LoadingSuspense>
        <PriceDelete.WithFetch id={id} onCloseBack />
      </LoadingSuspense>
    </RouterDialog>
  );
}
