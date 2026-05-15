import { LoadingSuspense, RouterDialog, SupermarketForm } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketDeletePage({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog open onCloseRedirect='./../'>
      <LoadingSuspense>
        <SupermarketForm.WithFetch id={id} onCloseRedirect='./../' />
      </LoadingSuspense>
    </RouterDialog>
  );
}
