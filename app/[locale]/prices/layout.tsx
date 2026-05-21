import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  modal: ReactNode;
};

export default function ProductsLayout({ children, modal }: Props) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
