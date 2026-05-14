import { getSupermarketByIdAction } from '@/lib';
import { ErrorDialog, SupermarketDialog } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketEditModal({ params }: Props) {
  const { id } = await params;
  const result = await getSupermarketByIdAction(id);

  if (result.isError || !result.data) {
    return (
      <ErrorDialog open onCloseBack title='Error' message={result.message} />
    );
  }

  return (
    <SupermarketDialog key='update' intercepted supermarket={result.data} />
  );
}
