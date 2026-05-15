import { LoadingSuspense, RouterDialog, TagForm } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TagEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog open onCloseRedirect='./../'>
      <LoadingSuspense>
        <TagForm.WithFetch id={id} onCloseRedirect='./../' />
      </LoadingSuspense>
    </RouterDialog>
  );
}
