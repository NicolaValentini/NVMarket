import { RouterDialog, TagForm } from '@/components';

export default function TagCreateModal() {
  return (
    <RouterDialog key='create-tag' open onCloseBack>
      <TagForm onCloseBack />
    </RouterDialog>
  );
}
