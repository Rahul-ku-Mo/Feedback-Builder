"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";

const TextAreaBlock = ({
  required = false,
  errorMessage = "Please enter a comment",
}: {
  required: boolean;
  errorMessage: string;
}) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event: any) => {
    setComment(event.target.value);
  };

  const handleClearComment = () => {
    setComment("");
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
