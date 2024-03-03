import React, { useState } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Key } from "@mui/icons-material";
import { Box } from "@mui/material";
import { CustomTextField } from "../assets/styles/styles";

type PasswordFieldsProps = {
  value: string;
  id: string;
  label: string;
  error: boolean;
  helperText?: any;
  onChange: (value: string) => void;
};

const PasswordFields = ({
  value,
  id,
  label,
  error,
  helperText,
  onChange,
}: PasswordFieldsProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Box>
      <CustomTextField
        id={id}
        value={value}
        onChange={handleChange}
        type={showPassword ? "text" : "password"}
        error={error}
        helperText={helperText}
        fullWidth
        label={label}
        placeholder={label}
        required
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Key />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
                tabIndex={-1}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default PasswordFields;
