import { LoadingSuspense, RouterDialog, ProductForm } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog open onCloseRedirect='./../'>
      <LoadingSuspense>
        <ProductForm.WithFetch id={id} onCloseRedirect='./../' />
      </LoadingSuspense>
    </RouterDialog>
  );
}
