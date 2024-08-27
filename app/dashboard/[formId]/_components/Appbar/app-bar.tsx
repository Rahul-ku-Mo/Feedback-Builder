"use client";

import { AppBar, Box, Skeleton } from "@mui/material";
import { SaveButton, PublishButton } from "./action-button";

import { useQuery } from "@tanstack/react-query";

const CustomAppBar = ({ formId }: { formId: string }) => {
  const { data, isPending } = useQuery({
    queryKey: ["forms", formId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/forms/${formId}`);
      const form = await response.json();

      return form;
    },
    
  });

  return (
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

      {formId.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: "10px",
          }}
        >
          {isPending ? (
            <Skeleton variant="rectangular" width={100} height={40} />
          ) : (
            <>
              <SaveButton form={data} />
              <PublishButton formId={formId} isPublished={data.isPublished} />
            </>
          )}
        </Box>
      )}
    </AppBar>
  );
};
export default CustomAppBar;
