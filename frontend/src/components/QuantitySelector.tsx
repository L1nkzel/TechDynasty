import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { IncDecButton } from '../assets/styles/styles';

interface QuantitySelectorProps {
  value: number;
  maxQty: number;
  onChange: (newValue: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ value, maxQty, onChange }) => {
  const [inputValue, setInputValue] = useState<string | number>(value.toString());

  // Update inputValue when value prop changes
  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };
  const handleInputConfirm = () => {
    // Parse the input value to a number
    let newValue = parseInt(inputValue as string);
    
    // Check if newValue is a valid number and within range
    if (!isNaN(newValue) && newValue >= 1 && newValue <= maxQty) {
      onChange(newValue); // Update the value
    } else {
      // If not a valid number or out of range, revert to the previous value
      newValue = value;
    }
  
    setInputValue(newValue.toString()); // Update inputValue
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      handleInputConfirm();
    }
  };

  return (
    <Box display="flex" alignItems="center" gap={{ xxxs: 0.5, sm: 1 }}>
      <IncDecButton variant='contained'  onClick={() => onChange(Math.max(value - 1, 1))}>-</IncDecButton>
      <TextField
        sx={{ '& input': { fontSize: 'small', padding: "4px", maxWidth: "24px", maxHeight: "24px", textAlign: 'center'} }}
        size="small"
        value={inputValue}
        inputProps={{ style: { textAlign: 'center' } }}
        onChange={(e) => handleInputChange(e.target.value)}
        onBlur={handleInputConfirm}
        onKeyDown={handleInputKeyDown}
      />
      <IncDecButton variant='contained' onClick={() => onChange(Math.min(value + 1, maxQty))}>+</IncDecButton>
    </Box>
  );
};

export default QuantitySelector;

