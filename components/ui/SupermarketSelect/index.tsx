import { FC } from 'react';

import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

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
  const handleChange = (value: string) =>
    setSupermarket(selectedSupermarket === value ? '' : value);

  return (
    <FormControl
      fullWidth
      error={!!error}
      disabled={disabled}
      sx={{ minWidth: 160 }}
    >
      <InputLabel id='supermarket-label'>Supermarket</InputLabel>

      <Select
        value={selectedSupermarket}
        labelId='supermarket-label'
        input={<OutlinedInput label='Supermarket' />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            <ColoredBox
              key={selected}
              item={
                supermarkets.find(supermarket => supermarket.id === selected)!
              }
            />
          </Box>
        )}
      >
        {supermarkets.map(supermarket => {
          const value = supermarket.id;
          const selected = selectedSupermarket === value;

          return (
            <MenuItem
              key={supermarket.id}
              value={value}
              onClick={() => handleChange(value)}
              sx={coloredStyles(supermarket.color)}
            >
              <Checkbox checked={selected} />

              {supermarket.name}
            </MenuItem>
          );
        })}
      </Select>

      <FormHelperText>{error}</FormHelperText>

      <input type='hidden' name='supermarket' value={selectedSupermarket} />
    </FormControl>
  );
};
