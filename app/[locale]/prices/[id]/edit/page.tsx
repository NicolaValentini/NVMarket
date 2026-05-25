import { LoadingSuspense, PriceUpsert } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PriceEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <PriceUpsert id={id} onCloseRedirect='./../../products' />
    </LoadingSuspense>
  );
}
