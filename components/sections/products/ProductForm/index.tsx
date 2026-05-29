'use client';

import { ChangeEvent, FC, useState, useTransition } from 'react';

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
  createProductAction,
  ProductErrors,
  ProductWithTag,
  Tag,
  updateProductAction,
} from '@/lib';

import { ErrorAlert } from '../../../feedback';
import {
  RouterDialog,
  RouterDialogOnCloseProps,
  TagChip,
  TagSelect,
} from '../../../ui';

type Props = RouterDialogOnCloseProps & {
  tags: Tag[];
  tagsError?: string | undefined;
  product?: ProductWithTag | undefined;
};

export const ProductForm: FC<Props> = ({
  tags,
  tagsError,
  product,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
}) => {
  const isEdit = !!product?.id;

  const [name, setName] = useState(product?.name ?? '');
  const [selectedTags, setTags] = useState(
    product?.tags?.map(tag => tag.id) ?? [],
  );

  const [loading, startTransition] = useTransition();
  const [errors, setErrors] = useState<ProductErrors>({});

  const getFormAction =
    (handleClose: () => void) => async (formData: FormData) => {
      if (loading) return;
      if (Object.keys(errors).length) setErrors({});

      startTransition(async () => {
        const _errors = isEdit
          ? await updateProductAction(formData)
          : await createProductAction(formData);

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
          {isEdit && <input type='hidden' name='id' value={product.id} />}

          <DialogTitle>{isEdit ? 'Edit Product' : 'New Product'}</DialogTitle>

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

            <TagSelect
              multiple
              tags={tags}
              disabled={loading}
              selectedTags={selectedTags}
              setTags={setTags}
              error={tagsError ?? errors.tags}
            />

            <Paper variant='outlined'>
              <List disablePadding>
                <ListItem>
                  <ListItemText
                    slotProps={{ primary: { sx: { display: 'flex', gap: 1 } } }}
                  >
                    {name?.trim()?.toUpperCase() || 'PREVIEW'}
                    {selectedTags.map(tag => (
                      <TagChip
                        key={tag}
                        tag={tags.find(_tag => _tag.id === tag)!}
                      />
                    ))}
                  </ListItemText>
                </ListItem>
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
