import { LoadingSuspense, RouterDialog, PriceDelete } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PriceDeletePage({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog open onCloseRedirect='./../../products'>
      <LoadingSuspense>
        <PriceDelete.WithFetch id={id} onCloseRedirect='./../../products' />
      </LoadingSuspense>
    </RouterDialog>
  );
}
