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
import { useParams } from "next/navigation";
import { useFormTitle } from "../../../hooks/useFormActions";

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

const EditCardModal = ({
  open,
  handleClose,
  title,
}: {
  open: boolean;
  handleClose: () => void;
  title: string;
}) => {
  const [value, setValue] = useState<string>(title);

  const params = useParams<{ formId: string }>();

  const changeTitle = useFormTitle(params.formId as string);

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
            Edit Feedback Form
          </Typography>
          <TextField
            id="edit-form-input"
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
                  if (value !== "") {
                    changeTitle.mutate(value);
                  }

                  handleClose();
                }}
              >
                SAVE
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

export default EditCardModal;
