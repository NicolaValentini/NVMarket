import { LoadingSuspense, PriceDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PriceDeleteModal({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <PriceDelete id={id} onCloseBack />
    </LoadingSuspense>
  );
}
