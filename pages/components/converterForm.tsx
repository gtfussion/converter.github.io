import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import { FiArrowRight } from "react-icons/fi";

const CONVERT_CONST = 3;

const regex = /^\d*\.?\d{0,2}$/;
const ConverterForm = (): JSX.Element => {
  const [NEP, setNEP] = useState<string>("");
  const [BUSD, setBUSD] = useState<string>("");

  const testValue = (value: string): boolean => regex.test(value);

  const onNEPChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (testValue(newValue)) {
      setNEP(newValue);
      if (isNaN(parseFloat(newValue))) {
        setBUSD("");
        return;
      }
      setBUSD((parseFloat(newValue) * 3).toFixed(2));
    }
  };

  const onBUSDChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (testValue(newValue)) {
      setBUSD(newValue);
      if (isNaN(parseFloat(newValue))) {
        setNEP("");
        return;
      }
      setNEP((parseFloat(newValue) / 3).toFixed(2));
    }
  };

  return (
    <div className="card">
      <div className="converter-form-section">
        <FormControl fullWidth>
          <FormLabel aria-label="NEP">Amount</FormLabel>

          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Box>
                    <Typography>NEP</Typography>
                  </Box>
                </InputAdornment>
              ),
            }}
            value={NEP}
            onChange={onNEPChange}
          />
        </FormControl>
        <div className="icon">
          <FiArrowRight />
        </div>
        <FormControl fullWidth>
          <FormLabel aria-label="BUSD">Converted To</FormLabel>
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography>BUSD</Typography>
                </InputAdornment>
              ),
            }}
            value={BUSD}
            onChange={onBUSDChange}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default ConverterForm;
