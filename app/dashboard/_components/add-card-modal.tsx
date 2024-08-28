"use client";

import {
  TextField,
  Stack,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";

import { useState } from "react";
import { useFormCreate } from "../hooks/useFormActions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  p: 2,
};

const AddCardModal = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [value, setValue] = useState<string>("");

  const addForm = useFormCreate();

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-create-form"
        aria-describedby="modal-create-form-description"
      >
        <Stack spacing={1} sx={style}>
          <Typography
            id="modal-create-form"
            variant="h6"
            component="h2"
            sx={{
              letterSpacing: "-0.2px",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Create Feedback Form
          </Typography>
          <TextField
            id="create-form-input"
            variant="standard"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            sx={{
              width: "100%",
            }}
          />
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <Stack
              spacing={2}
              direction="row"
              sx={{
                fontSize: 14,
              }}
            >
              <Button
                color="success"
                sx={{
                  fontWeight: "500",
                }}
                onClick={() => {
                  if (value === "") return;

                  addForm.mutate(value);
                }}
              >
                CREATE
              </Button>
              <Button
                sx={{
                  fontWeight: "500",
                }}
                onClick={handleClose}
              >
                CANCEL
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Modal>
    </>
  );
};

export default AddCardModal;
