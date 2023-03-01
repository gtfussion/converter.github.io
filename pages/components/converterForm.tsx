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

const ConverterForm = () => {
  const [NEP, setNEP] = useState<number>(1);
  const [BUSD, setBUSD] = useState<number>(3);

  const onNEPChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value) ?? 1;
    setNEP(parseFloat(value.toFixed(2)));
    setBUSD(parseFloat((value / CONVERT_CONST).toFixed(2)));
  };

  const onBUSDChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value) ?? 1;
    setBUSD(parseFloat(value.toFixed(2)));
    setNEP(parseFloat((value * CONVERT_CONST).toFixed(2)));
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
            value={isNaN(NEP) ? "" : NEP}
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
            value={isNaN(NEP) ? "" : BUSD}
            onChange={onBUSDChange}
          />
        </FormControl>
      </div>
    </div>
  );
};

export default ConverterForm;
