import { LoadingSuspense, TagDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TagDeleteModal({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <TagDelete id={id} onCloseBack />
    </LoadingSuspense>
  );
}
