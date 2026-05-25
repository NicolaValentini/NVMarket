import { LoadingSuspense, ProductUpsert } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <ProductUpsert id={id} onCloseRedirect='./../' />
    </LoadingSuspense>
  );
}
