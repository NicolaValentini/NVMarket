import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function TagsLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
