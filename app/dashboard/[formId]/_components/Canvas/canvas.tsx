import { Box, Paper } from "@mui/material";

import CanvasTopBar from "./canvas-top-bar";
import CanvasBlocks from "./canvas-blocks";

const Canvas = () => {
  return (
    <Paper
      elevation={8}
      sx={{
        width: "500px",
        maxHeight: "fit-content",
        display: "flex",
        borderRadius: 2,
        flexDirection: "column",
      }}
    >
      <CanvasTopBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          height: "fit-content",
          minHeight: "400px",
          zIndex: 5,
          p: 1,
        }}
      >
        <CanvasBlocks />
      </Box>
    </Paper>
  );
};
export default Canvas;
