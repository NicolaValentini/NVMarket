import { LoadingSuspense, PriceForm, RouterDialog } from '@/components';

type Props = {
  params: Promise<{ productId: string }>;
};

export default async function PriceCreatePage({ params }: Props) {
  const { productId } = await params;

  return (
    <RouterDialog open onCloseRedirect='./../../products'>
      <LoadingSuspense>
        <PriceForm.WithFetch
          productId={productId}
          onCloseRedirect='./../../products'
        />
      </LoadingSuspense>
    </RouterDialog>
  );
}
