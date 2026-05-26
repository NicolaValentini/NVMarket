import { FC } from 'react';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { Tag } from '@/lib';

import { TagChip } from '../TagChip';

type Props = {
  tags: Tag[];
  selectedTags: string[];
  setTags: (tags: string[]) => void;
  disabled?: boolean;
  error?: string | undefined;
};

export const TagSelect: FC<Props> = ({
  tags,
  selectedTags,
  setTags,
  disabled,
  error,
}) => {
  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setTags(typeof value === 'string' ? value.split(',') : value);
  };

  return (
    <FormControl fullWidth error={!!error} disabled={disabled}>
      <InputLabel id='tags-label'>Tags</InputLabel>

      <Select
        multiple
        value={selectedTags}
        onChange={handleChange}
        labelId='tags-label'
        input={<OutlinedInput label='Tags' />}
        renderValue={selected => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map(value => (
              <TagChip key={value} tag={tags.find(tag => tag.id === value)!} />
            ))}
          </Box>
        )}
      >
        {tags.map(tag => {
          const value = tag.id;
          const selected = selectedTags.includes(value);

          return (
            <MenuItem key={tag.id} value={value}>
              <Checkbox checked={selected} />

              <TagChip tag={tag} />
            </MenuItem>
          );
        })}
      </Select>

      <FormHelperText>{error}</FormHelperText>

      <input type='hidden' name='tags' value={selectedTags} />
    </FormControl>
  );
};
