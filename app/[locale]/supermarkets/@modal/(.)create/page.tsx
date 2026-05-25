import { LoadingSuspense, SupermarketUpsert } from '@/components';

export default function SupermarketCreateModal() {
  return (
    <LoadingSuspense>
      <SupermarketUpsert onCloseBack />
    </LoadingSuspense>
  );
}
