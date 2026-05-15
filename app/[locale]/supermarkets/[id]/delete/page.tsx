import { LoadingSuspense, RouterDialog, SupermarketDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketDeletePage({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog open onCloseRedirect='./../'>
      <LoadingSuspense>
        <SupermarketDelete.WithFetch id={id} onCloseRedirect='./../' />
      </LoadingSuspense>
    </RouterDialog>
  );
}
