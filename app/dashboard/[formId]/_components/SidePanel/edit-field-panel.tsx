"use client";

import {
  Stack,
  Typography,
  TextField,
  Paper,
  FormControlLabel,
  FormGroup,
  Button,
  FormLabel,
} from "@mui/material";
import { useState } from "react";

import { useBlocksStore } from "@/providers/block-store-provider";
import { ChevronLeft } from "@mui/icons-material";
import ControlledSwitches from "../blocks/shared/switch-custom-btn";

const EditFieldPanel = () => {
  const { selectBlock, selectedBlock, editBlocks } = useBlocksStore(
    (state) => state
  );

  const [options, setOptions] = useState(selectedBlock?.options || []);
  const [label, setLabel] = useState(selectedBlock?.label || "");
  const [required, setRequired] = useState(selectedBlock?.required || false);
  const [errorMessage, setErrorMessage] = useState(
    selectedBlock?.errorMessage || ""
  );

  const handleOptionChange = (index: number, value: string) => {
    setOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRequired(event.target.checked);
  };

  const handleSave = () => {
    editBlocks({
      ...selectedBlock,
      label,
      required,
      options,
      errorMessage,
    });
  };

  return (
    <Paper
      elevation={8}
      sx={{
        pt: 8,
        position: "fixed",
        right: 0,
        px: 4,
        width: 320,
        height: "100%",
        overflowY: "auto",
        pb: 4,
      }}
    >
      <Stack
        spacing={1}
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <ChevronLeft
          sx={{
            fontSize: 40,
            cursor: "pointer",
          }}
          onClick={() => selectBlock("")}
        />
        <Typography
          variant="h6"
          sx={{
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          Back to Add Fields
        </Typography>
      </Stack>
      <FormGroup>
        <Stack spacing={1}>
          <TextField
            id="add-block-label"
            label="Label"
            variant="standard"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
          <FormControlLabel
            control={
              <ControlledSwitches
                checked={required as boolean}
                handleChange={handleChange}
              />
            }
            label="Required"
          />
          <TextField
            id="add-block-error-message"
            label="Error Message"
            helperText="Helper Text"
            variant="standard"
            value={errorMessage}
            onChange={(e) => setErrorMessage(e.target.value)}
          />
          {(selectedBlock?.type === "category" ||
            selectedBlock?.type === "radioMultiSelect") && (
            <>
              <FormLabel
                component="legend"
                sx={{
                  fontSize: "12px",
                }}
              >
                Options
              </FormLabel>
              {options.map((option: any, index: number) => (
                <TextField
                  key={index}
                  id={`add-option-${index}`}
                  variant="standard"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              ))}
            </>
          )}
          <Stack spacing={2} direction="row">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
            <Button
              variant="outlined"
              color="info"
              onClick={() => {
                selectBlock("");
              }}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </FormGroup>
    </Paper>
  );
};

export default EditFieldPanel;
