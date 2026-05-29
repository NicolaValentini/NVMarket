import { FC } from 'react';

import Box from '@mui/material/Box';

import { Tag } from '@/lib';

import { Select } from '../Select';
import { TagChip } from '../TagChip';

type Props = {
  multiple?: true;
  tags: Tag[];
  selectedTags: string[];
  setTags: (tags: string[]) => void;
  disabled?: boolean;
  error?: string | undefined;
};

export const TagSelect: FC<Props> = ({
  multiple,
  tags,
  selectedTags,
  setTags,
  disabled,
  error,
}) => {
  const renderSelected = (value: string) => (
    <TagChip key={value} tag={tags.find(tag => tag.id === value)!} />
  );

  return (
    <Select<Tag>
      options={tags}
      error={error}
      disabled={disabled}
      label='Tags'
      renderOption={tag => <TagChip tag={tag} />}
      hiddenName={multiple ? 'tags' : 'tag'}
      {...(multiple
        ? {
            multiple: true,
            multiSelected: selectedTags,
            setMultiSelected: setTags,
            renderMultiValue: selected => (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {selected.map(renderSelected)}
              </Box>
            ),
          }
        : {
            singleSelected: selectedTags[0] ?? '',
            setSingleSelected: (value: string) => setTags([value]),
            renderSingleValue: selected => (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {renderSelected(selected)}
              </Box>
            ),
          })}
    />
  );
};
