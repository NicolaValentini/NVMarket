import { LoadingSuspense, PriceUpsert } from '@/components';

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function PriceCreatePage({ params }: Props) {
  const { productId } = await params;

  return (
    <LoadingSuspense>
      <PriceUpsert productId={productId} onCloseRedirect='./../../products' />
    </LoadingSuspense>
  );
}
