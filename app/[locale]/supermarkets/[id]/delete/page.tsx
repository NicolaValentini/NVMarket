import { getSupermarketByIdAction } from '@/lib';
import { ErrorDialog, SupermarketDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketDeletePage({ params }: Props) {
  const { id } = await params;
  const result = await getSupermarketByIdAction(id);

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

  return <SupermarketDelete supermarket={result.data} />;
}
