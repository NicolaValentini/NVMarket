import { LoadingSuspense, ProductUpsert } from '@/components';

export default function ProductCreatePage() {
  return (
    <LoadingSuspense>
      <ProductUpsert onCloseRedirect='./' />
    </LoadingSuspense>
  );
}
