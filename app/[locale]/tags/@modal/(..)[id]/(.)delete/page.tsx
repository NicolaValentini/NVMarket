import { getTagByIdAction } from '@/lib';
import { ErrorDialog, TagDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TagDeleteModal({ params }: Props) {
  const { id } = await params;
  const result = await getTagByIdAction(id);

  if (result.isError || !result.data) {
    return (
      <ErrorDialog open onCloseBack title='Error' message={result.message} />
    );
  }

  return <TagDelete key='delete' intercepted tag={result.data} />;
}
