"use client";

import React, { useState } from "react";
import { TextField } from "@mui/material";

const SingleLineBlock = ({
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
      variant="outlined"
      id="text-area-input"
      sx={{
        width: "100%",
      }}
      value={comment}
      onChange={handleCommentChange}
      helperText={required && comment === "" ? errorMessage : ""}
      error={required && comment === ""}
    />
  );
};

export default SingleLineBlock;