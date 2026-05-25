import { LoadingSuspense, SupermarketDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketDeleteModal({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <SupermarketDelete id={id} onCloseBack />
    </LoadingSuspense>
  );
}
