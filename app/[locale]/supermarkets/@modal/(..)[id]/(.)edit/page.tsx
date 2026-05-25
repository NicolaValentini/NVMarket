import { LoadingSuspense, SupermarketUpsert } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketEditModal({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <SupermarketUpsert id={id} onCloseBack />
    </LoadingSuspense>
  );
}
