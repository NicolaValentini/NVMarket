'use client';

import { ChangeEvent, FC, useState, useTransition } from 'react';

import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

import {
  COLORS,
  createSupermarketAction,
  Supermarket,
  SupermarketErrors,
  updateSupermarketAction,
} from '@/lib';

import { ErrorAlert } from '../../../feedback';
import {
  ColoredListItem,
  ColorInput,
  RouterDialog,
  RouterDialogOnCloseProps,
} from '../../../ui';

type Props = RouterDialogOnCloseProps & {
  supermarket?: Supermarket | undefined;
};

export const SupermarketForm: FC<Props> = ({
  supermarket,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const isEdit = !!supermarket?.id;

  const [name, setName] = useState(supermarket?.name ?? '');
  const [color, setColor] = useState(supermarket?.color ?? COLORS[0]!);

  const [loading, startTransition] = useTransition();
  const [errors, setErrors] = useState<SupermarketErrors>({});

  const getFormAction =
    (handleClose: () => void) => async (formData: FormData) => {
      if (loading) return;
      if (Object.keys(errors).length) setErrors({});

      startTransition(async () => {
        const _errors = isEdit
          ? await updateSupermarketAction(formData)
          : await createSupermarketAction(formData);

        if (Object.keys(_errors).length) setErrors(_errors);
        else handleClose();
      });
    };

  return (
    <RouterDialog
      open
      onCloseBack={!loading ? onCloseBack : undefined}
      onCloseAction={!loading ? onCloseAction : undefined}
      onCloseRedirect={!loading ? onCloseRedirect : undefined}
      childrenAction={handleClose => (
        <form action={getFormAction(handleClose)}>
          {isEdit && <input type='hidden' name='id' value={supermarket.id} />}

          <DialogTitle>
            {isEdit ? 'Edit Supermarket' : 'New Supermarket'}
          </DialogTitle>

          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              pt: '8px !important',
            }}
          >
            <TextField
              id='name'
              autoFocus
              fullWidth
              name='name'
              label='Name'
              value={name}
              disabled={loading}
              error={!!errors.name}
              helperText={errors.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setName(event.target.value);
              }}
            />

            <ColorInput
              disabled={loading}
              selectedColor={color}
              setColor={setColor}
              error={errors.color}
            />

            <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
              <List disablePadding>
                <ColoredListItem
                  item={{
                    id: '',
                    name: name?.trim()?.toUpperCase() || 'PREVIEW',
                    color,
                  }}
                />
              </List>
            </Paper>

            <ErrorAlert message={errors.result ?? errors.id} />
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>

            <Button type='submit' disabled={loading} variant='contained'>
              {loading ? <CircularProgress size={20} /> : 'Save'}
            </Button>
          </DialogActions>
        </form>
      )}
    />
  );
};
