"use client";

import EditIcon from "@mui/icons-material/Edit";
import { useBlocksStore } from "@/providers/block-store-provider";
export const CustomEditIcon = ({ id }: { id: string }) => {
  const { selectBlock } = useBlocksStore((state) => state);

  return (
    <EditIcon
      onClick={() => selectBlock(id)}
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
