import { LoadingSuspense, ProductUpsert } from '@/components';

export default function ProductCreateModal() {
  return (
    <LoadingSuspense>
      <ProductUpsert onCloseBack />
    </LoadingSuspense>
  );
}
