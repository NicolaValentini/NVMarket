import { LoadingSuspense, RouterDialog, SupermarketForm } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketEditModal({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog key='edit-supermarket' open onCloseBack>
      <LoadingSuspense>
        <SupermarketForm.WithFetch id={id} onCloseBack />
      </LoadingSuspense>
    </RouterDialog>
  );
}
