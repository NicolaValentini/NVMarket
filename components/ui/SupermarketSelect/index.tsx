import { FC } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Supermarket } from '@/lib';

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
}) => {
  const handleChange = (event: SelectChangeEvent) =>
    setSupermarket(event.target.value);

  return (
    <FormControl fullWidth error={!!error} disabled={disabled}>
      <InputLabel id='supermarket-label'>Supermarket</InputLabel>

      <Select
        value={selectedSupermarket}
        onChange={handleChange}
        labelId='supermarket-label'
        input={<OutlinedInput label='Supermarket' />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <ColoredBox key={selected} item={JSON.parse(selected)} />
          </Box>
        )}
      >
        {supermarkets.map(supermarket => {
          const value = JSON.stringify(supermarket);
          const selected = selectedSupermarket.includes(value);

          return (
            <MenuItem
              key={supermarket.id}
              value={value}
              sx={coloredStyles(supermarket.color)}
            >
              <Checkbox checked={selected} />

              {supermarket.name}
            </MenuItem>
          );
        })}
      </Select>

      <FormHelperText>{error}</FormHelperText>

      <input
        type='hidden'
        name='supermarket'
        value={selectedSupermarket ? JSON.parse(selectedSupermarket).id : ''}
      />
    </FormControl>
  );
};
