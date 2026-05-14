import { FC } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
  return (
    <>
      <Typography variant='body2' sx={{ mb: 1 }}>
        Color
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        {COLORS.map(color => (
          <Box
            key={color}
            onClick={() => !disabled && setColor(color)}
            sx={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              bgcolor: color,
              cursor: 'pointer',
              border:
                selectedColor === color
                  ? '3px solid white'
                  : '3px solid transparent',
              outline: selectedColor === color ? '2px solid' : 'none',
              outlineColor: color,
              transition: 'transform 0.1s',
              '&:hover': { transform: 'scale(1.15)' },
            }}
          />
        ))}
      </Box>

      {error && (
        <Typography variant='caption' color='error'>
          {error}
        </Typography>
      )}

      <input type='hidden' name='color' value={selectedColor} />
    </>
  );
};
