"use client";

import { Stack, Typography, Modal, AppBar } from "@mui/material";
import { blockTypeMap } from "@/app/dashboard/[formId]/_components/Canvas/canvas-blocks";
import { useBlocksStore } from "@/providers/block-store-provider";
import { useQuery } from "@tanstack/react-query";

import { Close } from "@mui/icons-material";
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
}: {
  open: boolean;
  handleClose: () => void;
  formId: string;
}) => {
  const { blocks, setBlocks } = useBlocksStore((state) => state);

  const { data, isPending } = useQuery({
    queryKey: ["blocks", formId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/forms/${formId}/fields`
      );

      const data = await response.json();

      setBlocks(data);

      return data;
    },
  });

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
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
              Form Name
            </Typography>
            <Close onClick={handleClose} />
          </AppBar>
          <Stack
            spacing={1}
            sx={{
              overflowY: "auto",
              height: "100%",
              maxHeight: "600px",
            }}
          >
            {blocks?.map((block: any) => {
              const Block = blockTypeMap[block.type];
              return (
                <BlockWrapper key={block.id} id={block.id} label={block.label}>
                  <Block
                    isCanvas={false}
                    required={block.required}
                    errorMessage={block.errorMessage}
                    options={block.options}
                  />
                </BlockWrapper>
              );
            })}
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default FeedbackFormModal;
