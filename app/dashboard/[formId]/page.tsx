import { Box } from "@mui/material";
import Canvas from "./_components/Canvas/canvas";
import OutlinePanel from "./_components/outline-panel";

const EditAdminForm = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "calc(100% - 320px)",
          overflowY: "auto",
          alignItems: "center",
          position: "absolute",
          top: 64,
          right: 0,
          left: 0,
          bottom: 0,
          flexGrow: 1,
          pb: 4,
        }}
      >
        <Canvas />
      </Box>
      <OutlinePanel />
    </div>
  );
};
export default EditAdminForm;
