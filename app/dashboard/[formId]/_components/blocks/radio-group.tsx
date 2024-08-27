"use client";

import { useState } from "react";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { FormHelperText } from "@mui/material";

const RadioMultiSelectBlock = ({
  options,
  required,
  errorMessage,
}: {
  options?: string[];
  required?: boolean;
  errorMessage?: string;
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <RadioGroup
        aria-labelledby="controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        {options?.map((option, index) => (
          <FormControlLabel
            key={option + "-" + index}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
      <FormHelperText sx={{
        mx: 0,
        color: "red",
      }}>
        {value === "" && required ? errorMessage : ""}
      </FormHelperText>
    </>
  );
};

export default RadioMultiSelectBlock;
