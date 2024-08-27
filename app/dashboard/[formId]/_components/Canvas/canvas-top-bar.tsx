"use client";

import { AppBar, Skeleton, Typography } from "@mui/material";
import CanvasEditModal from "./canvas-top-edit-modal";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import Link from "next/link";

const CanvasTopBar = ({}) => {
  const params = useParams<{ formId: string }>();

  const formId = params.formId;

  const { data, isPending } = useQuery({
    queryKey: ["forms", formId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/forms/${formId}`);
      const form = await response.json();

      return form;
    },
  });

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderRadius: "4px 4px 0px 0px",
          gap: 2,
          p: 2,
          zIndex: 10,
        }}
      >
        <Link
          href="/dashboard"
          style={{
            color: "#fff",
          }}
        >
          <ChevronLeftIcon />
        </Link>
        {isPending ? (
          <Skeleton width={"100%"} height={"100%"} />
        ) : (
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {data?.title}
          </Typography>
        )}
        <CanvasEditModal title={data?.title} />
      </AppBar>
    </>
  );
};

export default CanvasTopBar;
