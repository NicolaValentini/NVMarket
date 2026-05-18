import { LoadingSuspense, RouterDialog, ProductDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDeletePage({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog open onCloseRedirect='./../'>
      <LoadingSuspense>
        <ProductDelete.WithFetch id={id} onCloseRedirect='./../' />
      </LoadingSuspense>
    </RouterDialog>
  );
}
