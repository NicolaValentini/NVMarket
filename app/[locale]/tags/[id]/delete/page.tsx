import { LoadingSuspense, TagDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TagDeletePage({ params }: Props) {
  const { id } = await params;

  return (
    <LoadingSuspense>
      <TagDelete id={id} onCloseRedirect='./../' />
    </LoadingSuspense>
  );
}
