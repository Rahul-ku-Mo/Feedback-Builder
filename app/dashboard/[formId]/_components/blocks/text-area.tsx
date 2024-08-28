"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const TextAreaBlock = ({
  required = false,
  errorMessage = "Please enter a comment",
  value,
  onChange,
}: {
  required: boolean;
  errorMessage: string;
  value: any;
  onChange: (value: any) => void;
}) => {
  const [comment, setComment] = useState(value);

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setComment(newValue);
    onChange(newValue);
  };

  const handleClearComment = () => {
    setComment("");
    onChange("");
  };

  return (
    <TextField
      inputProps={{
        style: { fontSize: "14px" },
      }}
      size="small"
      id="text-area-input"
      value={comment}
      onChange={handleCommentChange}
      fullWidth
      multiline
      required={required}
      rows={3}
      helperText={required ? errorMessage : ""}
    />
  );
};

export default TextAreaBlock;
