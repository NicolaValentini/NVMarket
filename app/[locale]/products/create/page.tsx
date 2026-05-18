import { LoadingSuspense, ProductForm, RouterDialog } from '@/components';

export default function ProductCreatePage() {
  return (
    <RouterDialog open onCloseRedirect='./'>
      <LoadingSuspense>
        <ProductForm.WithFetch onCloseRedirect='./' />
      </LoadingSuspense>
    </RouterDialog>
  );
}
