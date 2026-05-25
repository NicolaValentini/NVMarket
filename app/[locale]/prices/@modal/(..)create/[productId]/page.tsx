import { LoadingSuspense, PriceUpsert } from '@/components';

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function PriceCreateModal({ params }: Props) {
  const { productId } = await params;

  return (
    <LoadingSuspense>
      <PriceUpsert productId={productId} onCloseBack />
    </LoadingSuspense>
  );
}
