import { LoadingSuspense, RouterDialog, PriceForm } from '@/components';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PriceEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <RouterDialog open onCloseRedirect='./../../products'>
      <LoadingSuspense>
        <PriceForm.WithFetch id={id} onCloseRedirect='./../../products' />
      </LoadingSuspense>
    </RouterDialog>
  );
}
