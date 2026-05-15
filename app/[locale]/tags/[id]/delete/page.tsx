import { LoadingSuspense, RouterDialog, TagDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TagDeletePage({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog open onCloseRedirect='./../'>
      <LoadingSuspense>
        <TagDelete.WithFetch id={id} onCloseRedirect='./../' />
      </LoadingSuspense>
    </RouterDialog>
  );
}
