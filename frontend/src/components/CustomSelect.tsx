import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Box, Select } from '@mui/material';

export default function CustomSelect({value, onChange, children}:any) {

  return (
    <>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel>Qty</InputLabel>
        <Select
          value={value}
          onChange={onChange}
          label="Qty"
          defaultValue="1"
        > 
          {children}
        </Select>
      </FormControl>
    </>
  );
}