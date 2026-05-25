import { LoadingSuspense, SupermarketUpsert } from '@/components';

export default function SupermarketCreatePage() {
  return (
    <LoadingSuspense>
      <SupermarketUpsert onCloseRedirect='./' />
    </LoadingSuspense>
  );
}
