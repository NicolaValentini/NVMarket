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
  createPriceAction,
  getPriceDisplayName,
  Price,
  PriceErrors,
  Product,
  Supermarket,
  updatePriceAction,
} from '@/lib';

import { ErrorAlert } from '../../../feedback';
import {
  ColoredListItem,
  RouterDialog,
  RouterDialogOnCloseProps,
  SupermarketSelect,
} from '../../../ui';

type Props = RouterDialogOnCloseProps & {
  supermarkets: Supermarket[];
  supermarketsError?: string | undefined;
} & ({ price: Price } | { product: Product });

export const PriceForm: FC<Props> = ({
  supermarkets,
  supermarketsError,
  onCloseBack,
  onCloseAction,
  onCloseRedirect,
  ...rest
}) => {
  const priceProps = 'price' in rest ? rest.price : undefined;
  const product = 'product' in rest ? rest.product : undefined;

  const isEdit = !!priceProps?.id;
  const supermarket = supermarkets.find(
    supermarket => supermarket.id === priceProps?.supermarket_id,
  );

  const [name, setName] = useState(priceProps?.name ?? '');
  const [price, setPrice] = useState(priceProps?.price?.toString() ?? '');
  const [yuka, setYuka] = useState(priceProps?.yuka?.toString() ?? '');
  const [selectedSupermarket, setSupermarket] = useState(
    supermarket ? JSON.stringify(supermarket) : '',
  );

  const [loading, startTransition] = useTransition();
  const [errors, setErrors] = useState<PriceErrors>({});

  const getFormAction =
    (handleClose: () => void) => async (formData: FormData) => {
      if (loading) return;
      if (Object.keys(errors).length) setErrors({});

      startTransition(async () => {
        const _errors = isEdit
          ? await updatePriceAction(formData)
          : await createPriceAction(formData);

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
          {isEdit && <input type='hidden' name='id' value={priceProps.id} />}
          <input
            type='hidden'
            name='product'
            value={product?.id || priceProps?.product_id}
          />

          <DialogTitle>{isEdit ? 'Edit Price' : 'New Price'}</DialogTitle>

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

            <TextField
              id='price'
              autoFocus
              fullWidth
              name='price'
              label='Price'
              value={price}
              disabled={loading}
              error={!!errors.price}
              helperText={errors.price}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                let value = event.target.value ?? '';
                value = value.replaceAll(',', '.');
                setErrors(prev => {
                  const copy = { ...prev };
                  const message = 'Value not allowed';

                  if (!/^\d+(\.\d{0,2})?$/.test(value)) copy.price = message;
                  else if (copy.price === message) delete copy.price;

                  return copy;
                });
                setPrice(value);
              }}
            />

            <SupermarketSelect
              supermarkets={supermarkets}
              selectedSupermarket={selectedSupermarket}
              setSupermarket={setSupermarket}
              disabled={loading}
              error={supermarketsError ?? errors.supermarket_id}
            />

            <TextField
              id='yuka'
              autoFocus
              fullWidth
              name='yuka'
              label='Yuka'
              value={yuka}
              disabled={loading}
              error={!!errors.yuka}
              helperText={errors.yuka}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                const value = event.target.value ?? '';
                setErrors(prev => {
                  const copy = { ...prev };
                  const message = 'Value not allowed';

                  if (!/^\d{1,2}$/.test(value)) copy.yuka = message;
                  else if (copy.yuka === message) delete copy.yuka;

                  return copy;
                });
                setYuka(value);
              }}
            />

            <Paper variant='outlined' sx={{ overflow: 'hidden' }}>
              <List disablePadding>
                <ColoredListItem
                  sx={{ paddingLeft: 10 }}
                  primary={getPriceDisplayName({
                    name: name?.trim()?.toUpperCase() || 'PREVIEW',
                    price,
                    yuka,
                  })}
                  item={
                    selectedSupermarket
                      ? JSON.parse(selectedSupermarket)
                      : undefined
                  }
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
      )}
    />
  );
};
