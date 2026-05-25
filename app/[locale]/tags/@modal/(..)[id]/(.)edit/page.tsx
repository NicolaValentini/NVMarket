import { LoadingSuspense, TagUpsert } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TagEditModal({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <TagUpsert id={id} onCloseBack />
    </LoadingSuspense>
  );
}
