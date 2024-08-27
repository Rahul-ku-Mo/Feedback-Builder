"use client";

import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import EditCardModal from "@/app/dashboard/[formId]/_components/Canvas/edit-card-modal";

const CanvasEditModal = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <EditIcon onClick={handleOpen} />
      <EditCardModal open={open} handleClose={handleClose} title={title} />
    </>
  );
};

export default CanvasEditModal;
