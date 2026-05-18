'use client';

import { ChangeEvent, FC, useState } from 'react';
import { useRouter } from 'next/navigation';

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
import { ColoredListItem, ColorInput } from '../../../ui';

type Props = {
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
  supermarket?: Supermarket | undefined;
};

export const SupermarketForm: FC<Props> = ({
  supermarket,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const router = useRouter();

  const isEdit = !!supermarket?.id;

  const handleClose = () => {
    if (onCloseAction) onCloseAction();
    else if (onCloseBack) router.back();
    else if (onCloseRedirect) router.push(onCloseRedirect);
  };

  const [name, setName] = useState(supermarket?.name ?? '');
  const [color, setColor] = useState(supermarket?.color ?? COLORS[0]!);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SupermarketErrors>({});

  const formAction = async (formData: FormData) => {
    if (loading) return;
    if (Object.keys(errors).length) setErrors({});
    setLoading(true);

    const _errors = isEdit
      ? await updateSupermarketAction(formData)
      : await createSupermarketAction(formData);

    if (Object.keys(_errors).length) setErrors(_errors);
    else handleClose();

    setLoading(false);
  };

  return (
    <form action={formAction}>
      {isEdit && <input type='hidden' name='id' value={supermarket.id} />}

      <DialogTitle>
        {isEdit ? 'Edit Supermarket' : 'New Supermarket'}
      </DialogTitle>

      <DialogContent>
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
          sx={{ mt: 1, mb: 3 }}
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
                name: name?.trim()?.toUpperCase() || 'PREVIEW',
                color,
              }}
            />
          </List>
        </Paper>

        <ErrorAlert message={errors.result} />
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
  );
};
