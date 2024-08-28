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
  value,
  onChange,
}: {
  options?: string[];
  required?: boolean;
  errorMessage?: string;
  value: any;
  onChange: (value: any) => void;
}) => {
  const [content, setContent] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (event.target as HTMLInputElement).value;
    setContent(newValue);
    onChange(newValue);
  };

  return (
    <>
      <RadioGroup
        aria-labelledby="controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={content}
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
      <FormHelperText
        sx={{
          mx: 0,
          color: "red",
        }}
      >
        {content === "" && required ? errorMessage : ""}
      </FormHelperText>
    </>
  );
};

export default RadioMultiSelectBlock;
