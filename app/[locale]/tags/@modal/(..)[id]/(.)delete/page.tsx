import { LoadingSuspense, RouterDialog, TagForm } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TagDeleteModal({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog key='delete-tag' open onCloseBack>
      <LoadingSuspense>
        <TagForm.WithFetch id={id} onCloseBack />
      </LoadingSuspense>
    </RouterDialog>
  );
}
