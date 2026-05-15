import { RouterDialog, TagForm } from '@/components';

export default function TagCreatePage() {
  return (
    <RouterDialog open onCloseRedirect='./'>
      <TagForm onCloseRedirect='./' />
    </RouterDialog>
  );
}
