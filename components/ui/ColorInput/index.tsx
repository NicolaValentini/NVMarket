import { FC } from 'react';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

import { COLORS } from '@/lib';

type Props = {
  selectedColor: string;
  setColor: (color: string) => void;
  disabled?: boolean;
  error?: string | undefined;
};

export const ColorInput: FC<Props> = ({
  selectedColor,
  setColor,
  disabled,
  error,
}) => {
  const labelId = 'color-input-label';

  return (
    <FormControl
      variant='outlined'
      error={!!error}
      disabled={disabled}
      fullWidth
    >
      <InputLabel id={labelId} shrink>
        Color
      </InputLabel>

      <OutlinedInput
        notched
        readOnly
        label='Color'
        tabIndex={disabled ? -1 : 0}
        inputComponent={() => null}
        sx={{ cursor: 'default', px: 1.75, py: 2 }}
        startAdornment={
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            {COLORS.map(color => (
              <Box
                key={color}
                onClick={() => !disabled && setColor(color)}
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  bgcolor: color,
                  cursor: disabled ? 'not-allowed' : 'pointer',
                  border:
                    selectedColor === color
                      ? '3px solid white'
                      : '3px solid transparent',
                  outline: selectedColor === color ? '2px solid' : 'none',
                  outlineColor: color,
                  transition: 'transform 0.1s',
                  '&:hover': !disabled ? { transform: 'scale(1.15)' } : {},
                }}
              />
            ))}
          </Box>
        }
      />

      <FormHelperText>{error}</FormHelperText>

      <input type='hidden' name='color' value={selectedColor} />
    </FormControl>
  );
};
