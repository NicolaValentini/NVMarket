import { LoadingSuspense, PriceDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PriceDeletePage({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <PriceDelete id={id} onCloseRedirect='./../../products' />
    </LoadingSuspense>
  );
}
