import { LoadingSuspense, ProductUpsert } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductEditModal({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <ProductUpsert id={id} onCloseBack />
    </LoadingSuspense>
  );
}
