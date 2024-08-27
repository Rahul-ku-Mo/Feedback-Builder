"use client";

import React, { useState } from "react";

import { TextField } from "@mui/material";

const SingleLineBlock = ({
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
      variant="outlined"
      id="text-area-input"
      value={comment}
      onChange={handleCommentChange}
      helperText={required ? errorMessage : ""}
      error={required && comment === ""}
    />
  );
};

export default SingleLineBlock;
