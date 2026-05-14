import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function SupermarketsLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
