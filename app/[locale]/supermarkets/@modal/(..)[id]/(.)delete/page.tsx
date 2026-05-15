import { LoadingSuspense, RouterDialog, SupermarketDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketDeleteModal({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog key='delete-supermarket' open onCloseBack>
      <LoadingSuspense>
        <SupermarketDelete.WithFetch id={id} onCloseBack />
      </LoadingSuspense>
    </RouterDialog>
  );
}
