import { ReactNode } from 'react';

import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';

type BaseProps<T> = {
  options: T[];
  error?: string | undefined;
  disabled?: boolean | undefined;
  label: string;
  renderOption: (option: T) => ReactNode;
  renderOptionSx?: ((option: T) => object) | undefined;
  hiddenName: string;
};

type SingleValueProps<T> = BaseProps<T> & {
  singleSelected: string;
  setSingleSelected: (id: string) => void;
  renderSingleValue: (id: string) => ReactNode;
};

type MultiValueProps<T> = BaseProps<T> & {
  multiple: true;
  multiSelected: string[];
  setMultiSelected: (ids: string[]) => void;
  renderMultiValue: (ids: string[]) => ReactNode;
};

type Props<T> = SingleValueProps<T> | MultiValueProps<T>;

export function Select<T extends { id: string }>({
  options,
  disabled,
  error,
  label,
  renderOption,
  renderOptionSx,
  hiddenName,
  ...rest
}: Props<T>) {
  return (
    <FormControl
      fullWidth
      error={!!error}
      disabled={disabled}
      sx={{ minWidth: 160 }}
    >
      <InputLabel id='select-label'>{label}</InputLabel>

      {'multiple' in rest ? (
        <MultiSelectBase<T>
          options={options}
          label={label}
          renderOption={renderOption}
          renderOptionSx={renderOptionSx}
          multiSelected={rest.multiSelected}
          renderMultiValue={rest.renderMultiValue}
          handleChange={(event: SelectChangeEvent<string[]>) => {
            const value = event.target.value;

            rest.setMultiSelected(
              typeof value === 'string' ? value.split(',') : value,
            );
          }}
        />
      ) : (
        <SingleSelectBase<T>
          options={options}
          label={label}
          renderOption={renderOption}
          renderOptionSx={renderOptionSx}
          singleSelected={rest.singleSelected}
          renderSingleValue={rest.renderSingleValue}
          handleChange={(value: string) => {
            rest.setSingleSelected(rest.singleSelected === value ? '' : value);
          }}
        />
      )}

      <FormHelperText>{error}</FormHelperText>

      <input
        type='hidden'
        name={hiddenName}
        value={'multiple' in rest ? rest.multiSelected : rest.singleSelected}
      />
    </FormControl>
  );
}

function SingleSelectBase<T extends { id: string }>({
  options,
  label,
  renderOption,
  renderOptionSx,
  singleSelected,
  renderSingleValue,
  handleChange,
}: Omit<SingleValueProps<T>, 'setSingleSelected' | 'hiddenName'> & {
  handleChange: (value: string) => void;
}) {
  return (
    <MuiSelect
      value={singleSelected}
      renderValue={renderSingleValue}
      labelId='select-label'
      input={<OutlinedInput label={label} />}
    >
      {options.map(option => {
        const value = option.id;
        const checked = singleSelected === value;

        return (
          <MenuItem
            key={value}
            value={value}
            onClick={() => handleChange(value)}
            sx={renderOptionSx?.(option)}
          >
            <Checkbox checked={checked} />

            {renderOption(option)}
          </MenuItem>
        );
      })}
    </MuiSelect>
  );
}

function MultiSelectBase<T extends { id: string }>({
  options,
  label,
  renderOption,
  renderOptionSx,
  multiSelected,
  renderMultiValue,
  handleChange,
}: Omit<MultiValueProps<T>, 'multiple' | 'setMultiSelected' | 'hiddenName'> & {
  handleChange: (event: SelectChangeEvent<string[]>) => void;
}) {
  return (
    <MuiSelect
      multiple
      value={multiSelected}
      onChange={handleChange}
      renderValue={renderMultiValue}
      labelId='select-label'
      input={<OutlinedInput label={label} />}
    >
      {options.map(option => {
        const value = option.id;
        const checked = multiSelected.includes(value);

        return (
          <MenuItem key={value} value={value} sx={renderOptionSx?.(option)}>
            <Checkbox checked={checked} />

            {renderOption(option)}
          </MenuItem>
        );
      })}
    </MuiSelect>
  );
}
