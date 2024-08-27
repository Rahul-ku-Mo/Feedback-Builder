import { AppBar } from "@mui/material";
import FormViewer from "./_components/form-viewer";

const Dashboard = () => {
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#ffff",
          color: "black",
        }}
      >
        <h3>User Feedback</h3>
      </AppBar>
      <FormViewer />
    </>
  );
};

export default Dashboard;
