"use client";
import { useState } from "react";
import { Stack, Typography, Modal, AppBar, Button, Paper } from "@mui/material";
import { blockTypeMap } from "@/app/dashboard/[formId]/_components/Canvas/canvas-blocks";
import { useBlocksStore } from "@/providers/block-store-provider";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@mui/material/Skeleton";
import { Close } from "@mui/icons-material";
import {
  useFormSubmit,
  useFormView,
} from "@/app/dashboard/hooks/useFormSubmit";
import BlockWrapper from "@/app/dashboard/[formId]/_components/blocks/block-wrapper";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 1,
  boxShadow: 24,
  height: "600px",
};

const FeedbackFormModal = ({
  open,
  handleClose,
  formId,
  formTitle,
}: {
  open: boolean;
  handleClose: () => void;
  formId: string;
  formTitle: string;
}) => {
  const { blocks, setBlocks } = useBlocksStore((state) => state);

  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});

  const handleInputChange = (id: string, value: any) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const { data, isPending } = useQuery({
    queryKey: ["blocks", formId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${formId}/fields`
      );

      const data = await response.json();

      setBlocks(data);

      return data;
    },
  });

  const formSubmit = useFormSubmit(formId);

  const viewSubmit = useFormView(formId);

  const handleCloseWithFormViewSubmit = () => {
    handleClose();
    viewSubmit.mutate();
  };

  const handleSubmit = () => {
    const formattedValues = blocks.map((block: any) => {
      const value = formValues[block.id];
      return {
        label: block.label,
        value: value,
        id: block.id,
      };
    });

    formSubmit.mutate({ fields: formattedValues });
    handleClose();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleCloseWithFormViewSubmit}
        aria-labelledby="modal-create-form"
        aria-describedby="modal-create-form-description"
      >
        <Stack spacing={1} sx={style}>
          <AppBar
            position="static"
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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
              {formTitle}
            </Typography>
            <Close onClick={handleCloseWithFormViewSubmit} />
          </AppBar>
          <Stack
            spacing={1}
            sx={{
              overflowY: "auto",
              height: "100%",
              maxHeight: "600px",
            }}
          >
            {isPending ? (
              <Skeleton height="500" />
            ) : (
              <>
                {blocks.length > 0 &&
                  blocks.map((block: any) => {
                    const Block = blockTypeMap[block.type];
                    return (
                      <BlockWrapper
                        key={block.id}
                        id={block.id}
                        label={block.label}
                      >
                        <Block
                          isCanvas={false}
                          required={block.required}
                          errorMessage={block.errorMessage}
                          options={block.options}
                          value={formValues[block.id] || ""}
                          onChange={(value: any) =>
                            handleInputChange(block.id, value)
                          }
                        />
                      </BlockWrapper>
                    );
                  })}
              </>
            )}
          </Stack>

          <Paper
            elevation={5}
            sx={{
              display: " flex",
              justifyContent: "center",
              alignItems: "center",
              py: 1,
            }}
          >
            <Button
              onClick={handleSubmit}
              variant="contained"
              type="submit"
              sx={{
                width: "fit-content",
                px: 3,
                py: 1,
              }}
            >
              Submit
            </Button>
          </Paper>
        </Stack>
      </Modal>
    </>
  );
};

export default FeedbackFormModal;
