
import { FormControl, Stack, Typography, Paper, } from "@mui/material";
import { CustomEditIcon } from "./shared/edit-custom-icon";
import { CustomDeleteIcon } from "./shared/delete-custom-icon";

const BlockWrapper = ({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        w: "100%",
      }}
    >
      <FormControl
        sx={{
          width: "100%",
          p: 0,
        }}
      >
        <Typography
          sx={{
            py: 1,
            fontSize: "14px",
          }}
        >
          {label}
        </Typography>
        {children}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{
            justifyContent: "flex-end",
            mt: 1,
          }}
        >
          <CustomEditIcon id={id}/>
          <CustomDeleteIcon id={id} />
        </Stack>
      </FormControl>
    </Paper>
  );
};

export default BlockWrapper;
