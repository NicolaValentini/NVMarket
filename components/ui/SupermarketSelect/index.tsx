import { FC } from 'react';

import Box from '@mui/material/Box';

import { Supermarket } from '@/lib';

import { Select } from '../Select';
import { ColoredBox, coloredStyles } from '../ColoredItems';

type Props = {
  supermarkets: Supermarket[];
  selectedSupermarket: string;
  setSupermarket: (supermarket: string) => void;
  disabled?: boolean;
  error?: string | undefined;
};

export const SupermarketSelect: FC<Props> = ({
  supermarkets,
  selectedSupermarket,
  setSupermarket,
  disabled,
  error,
}) => (
  <Select<Supermarket>
    options={supermarkets}
    error={error}
    disabled={disabled}
    label='Supermarkets'
    hiddenName='supermarket'
    renderOption={supermarket => supermarket.name}
    renderOptionSx={supermarket => coloredStyles(supermarket.color)}
    singleSelected={selectedSupermarket}
    setSingleSelected={setSupermarket}
    renderSingleValue={selected => (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        <ColoredBox
          key={selected}
          item={supermarkets.find(supermarket => supermarket.id === selected)!}
        />
      </Box>
    )}
  />
);
