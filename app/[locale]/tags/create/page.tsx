import { LoadingSuspense, TagUpsert } from '@/components';

export default function TagCreatePage() {
  return (
    <LoadingSuspense>
      <TagUpsert onCloseRedirect='./' />
    </LoadingSuspense>
  );
}
