import { getTagByIdAction } from '@/lib';
import { ErrorDialog, TagDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TagDeletePage({ params }: Props) {
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

  return <TagDelete tag={result.data} />;
}
