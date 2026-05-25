import { LoadingSuspense, TagUpsert } from '@/components';

export default function TagCreateModal() {
  return (
    <LoadingSuspense>
      <TagUpsert onCloseBack />
    </LoadingSuspense>
  );
}
