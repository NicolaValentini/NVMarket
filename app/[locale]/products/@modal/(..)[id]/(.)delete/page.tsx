import { LoadingSuspense, ProductDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDeleteModal({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <ProductDelete id={id} onCloseBack />
    </LoadingSuspense>
  );
}
