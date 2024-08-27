"use client";

import DeleteIcon from "@mui/icons-material/Delete";
import { useBlocksStore } from "@/providers/block-store-provider";

export const CustomDeleteIcon = ({ id }: { id: string }) => {
  const { deleteBlock, selectBlock, selectedBlock } = useBlocksStore(
    (state) => state
  );

  return (
    <DeleteIcon
      onClick={() => {
        deleteBlock(id as string);

        if (selectedBlock?.id === id) {
          selectBlock("");
        }
      }}
      sx={{
        borderRadius: "50%",
        p: 0.5,
        fontSize: 32,
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        ":hover": {
          opacity: "0.8",
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    />
  );
};
