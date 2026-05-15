import { getTagByIdAction } from '@/lib';
import { ErrorDialog, TagDialog } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TagEditModal({ params }: Props) {
  const { id } = await params;
  const result = await getTagByIdAction(id);

  if (result.isError || !result.data) {
    return (
      <ErrorDialog
        open
        title='Error'
        onCloseRedirect='./../'
        message={result.message}
      />
    );
  }

  return <TagDialog key='update' intercepted tag={result.data} />;
}
