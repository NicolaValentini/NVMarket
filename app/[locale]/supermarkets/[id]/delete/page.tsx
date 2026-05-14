import { getSupermarketByIdAction } from '@/lib';
import { ErrorAlert, SupermarketDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function SupermarketDeletePage({ params }: Props) {
  const { id } = await params;
  const result = await getSupermarketByIdAction(id);

  if (result.isError || !result.data) {
    return <ErrorAlert message={result.message} />;
  }

  return <SupermarketDelete supermarket={result.data} />;
}
