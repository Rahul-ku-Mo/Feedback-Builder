"use client";

import { useState } from "react";
import { CardActionArea, Card, CardContent, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import AddCardModal from "./add-card-modal";

const AddCard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ width: 280, height: "100%", minHeight: "328px" }}>
        <CardActionArea
          sx={{ width: "100%", minHeight: "328px" }}
          onClick={handleOpen}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <AddIcon
              color="primary"
              sx={{
                fontSize: 80,
                cursor: "pointer",
              }}
            />
            <Typography
              variant="h5"
              sx={{
                fontSize: 32,
                fontWeight: "bold",
              }}
            >
              New Form
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      <AddCardModal open={open} handleClose={handleClose} />
    </>
  );
};

export default AddCard;
