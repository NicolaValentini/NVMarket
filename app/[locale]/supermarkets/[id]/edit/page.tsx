import { getSupermarketByIdAction } from '@/lib';
import { ErrorDialog, SupermarketDialog } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketEditPage({ params }: Props) {
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

  return <SupermarketDialog supermarket={result.data} />;
}
