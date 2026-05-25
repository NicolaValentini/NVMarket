import { LoadingSuspense, ProductDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDeletePage({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <ProductDelete id={id} onCloseRedirect='./../' />
    </LoadingSuspense>
  );
}
