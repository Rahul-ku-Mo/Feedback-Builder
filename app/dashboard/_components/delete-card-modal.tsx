"use client";
import { toast } from "sonner";
import {
  TextField,
  Stack,
  Button,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import { useFormStore } from "@/providers/form-store-provider";

import { useRouter } from "next/navigation";
import { queryClient } from "@/lib/query-client";

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

const DeleteCardModal = ({
  open,
  handleClose,
  id,
}: {
  open: boolean;
  handleClose: () => void;
  id: string;
}) => {
  const { deleteForm, selectForm } = useFormStore((state) => state);
  const router = useRouter();

  const deleteFormFromDB = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/forms/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      deleteForm(id);

      queryClient.invalidateQueries({
        queryKey: ["forms"],
      });

    
    }
  };

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
            id="modal-delete-form"
            variant="h6"
            component="h2"
            sx={{
              letterSpacing: "-0.2px",
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Are you sure you want to delete this form?
          </Typography>
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
                color="warning"
                sx={{
                  fontWeight: "500",
                }}
                onClick={async () => await deleteFormFromDB()}
              >
                YES
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

export default DeleteCardModal;
