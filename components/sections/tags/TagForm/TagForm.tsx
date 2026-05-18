'use client';

import { ChangeEvent, FC, useState } from 'react';
import { useRouter } from 'next/navigation';

import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemText from '@mui/material/ListItemText';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

import {
  COLORS,
  createTagAction,
  Tag,
  TagErrors,
  updateTagAction,
} from '@/lib';

import { ErrorAlert } from '../../../feedback';
import { ColorInput, TagChip } from '../../../ui';

type Props = {
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
  tag?: Tag | undefined;
};

export const TagForm: FC<Props> = ({
  tag,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const router = useRouter();

  const isEdit = !!tag?.id;

  const handleClose = () => {
    if (onCloseAction) onCloseAction();
    else if (onCloseBack) router.back();
    else if (onCloseRedirect) router.push(onCloseRedirect);
  };

  const [name, setName] = useState(tag?.name ?? '');
  const [color, setColor] = useState(tag?.color ?? COLORS[0]!);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<TagErrors>({});

  const formAction = async (formData: FormData) => {
    if (loading) return;
    if (Object.keys(errors).length) setErrors({});
    setLoading(true);

    const _errors = isEdit
      ? await updateTagAction(formData)
      : await createTagAction(formData);

    if (Object.keys(_errors).length) setErrors(_errors);
    else handleClose();

    setLoading(false);
  };

  return (
    <form action={formAction}>
      {isEdit && <input type='hidden' name='id' value={tag.id} />}

      <DialogTitle>{isEdit ? 'Edit Tag' : 'New Tag'}</DialogTitle>

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

        <Paper variant='outlined'>
          <List disablePadding>
            <ListItem>
              <ListItemText
                primary={
                  <TagChip
                    tag={{
                      id: '',
                      name: name?.trim()?.toUpperCase() || 'PREVIEW',
                      color,
                    }}
                  />
                }
              />
            </ListItem>
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
