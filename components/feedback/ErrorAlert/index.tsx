import { FC } from 'react';

import Alert from '@mui/material/Alert';

type Props = {
  message: string | null | undefined;
};

export const ErrorAlert: FC<Props> = ({ message }) => {
  if (!message) return null;

  return (
    <Alert severity='error' sx={{ mb: 2 }}>
      {message}
    </Alert>
  );
};
