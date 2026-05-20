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
  createProductAction,
  ProductErrors,
  ProductWithTag,
  Tag,
  updateProductAction,
} from '@/lib';

import { TagSelect } from '../../../ui';
import { ErrorAlert } from '../../../feedback';

type Props = {
  tags: Tag[];
  tagsError?: string | undefined;
  onCloseBack?: boolean | undefined;
  onCloseRedirect?: string | undefined;
  onCloseAction?: (() => void) | undefined;
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
  const router = useRouter();

  const isEdit = !!product?.id;

  const handleClose = () => {
    if (onCloseAction) onCloseAction();
    else if (onCloseBack) router.back();
    else if (onCloseRedirect) router.push(onCloseRedirect);
  };

  const [name, setName] = useState(product?.name ?? '');
  const [selectedTags, setTags] = useState(
    product?.tags?.map(tag => JSON.stringify(tag)) ?? [],
  );

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ProductErrors>({});

  const formAction = async (formData: FormData) => {
    if (loading) return;
    if (Object.keys(errors).length) setErrors({});
    setLoading(true);

    const _errors = isEdit
      ? await updateProductAction(formData)
      : await createProductAction(formData);

    if (Object.keys(_errors).length) setErrors(_errors);
    else handleClose();

    setLoading(false);
  };

  return (
    <form action={formAction}>
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
          tags={tags}
          disabled={loading}
          selectedTags={selectedTags}
          setTags={setTags}
          error={tagsError ?? errors.tags}
        />

        <Paper variant='outlined'>
          <List disablePadding>
            <ListItem>
              <ListItemText>
                {name?.trim()?.toUpperCase() || 'PREVIEW'}
              </ListItemText>
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
