"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
  Skeleton,
} from "@mui/material";
import FeedbackAccordion from "./_components/feedback-accordion";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

const FeedbackForm = () => {
  const params = useParams();

  const { data, isPending } = useQuery({
    queryKey: ["feedback", params.feedbackId],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/forms/${params.feedbackId}`
      );
      const data = await response.json();
      return data;
    },
  });

  return (
    <Paper
      elevation={5}
      sx={{
        borderRadius: "2px",
        p: 4,
        py: 8,
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Generic Website Rating
          </Typography>
        </Toolbar>
      </AppBar>
      <Stack
        spacing={4}
        direction="row"
        sx={{
          px: 3,
          py: 4,
        }}
      >
        {isPending ? (
          <Skeleton width={"76px"} height={"92px"} />
        ) : (
          <Stack
            sx={{
              justifyContext: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" sx={{ fontSize: 56, fontWeight: 800 }}>
              {data?.views}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.2px" }}
            >
              Views
            </Typography>
          </Stack>
        )}
        {isPending ? (
          <Skeleton width={"76px"} height={"92px"} />
        ) : (
          <Stack
            sx={{
              justifyContext: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h2" sx={{ fontSize: 56, fontWeight: 800 }}>
              {data?.submissions}
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.2px" }}
            >
              Submitted
            </Typography>
          </Stack>
        )}
      </Stack>
      <Stack
        spacing={2}
        sx={{
          px: 3,
        }}
      >
        {data && (
          <>
            <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
              Page URL: {data.specificURL || "No URL set yet."}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
              Date:{" "}
              {data.specificDate
                ? new Date(data.specificDate).toLocaleDateString()
                : "No date set yet."}
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
              Time:{" "}
              {data.specificTime
                ? dayjs(data.specificTime).utc().format("h:mm A")
                : "No Time set yet."}
            </Typography>
          </>
        )}
      </Stack>
      <Grid
        container
        spacing={2}
        sx={{
          mt: 1,
        }}
      >
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: "16px", fontWeight: 700, py: 1 }}>
                Feedback List
              </Typography>
              <FeedbackAccordion formId={params.feedbackId as string} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FeedbackForm;
