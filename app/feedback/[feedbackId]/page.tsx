import {
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Stack,
  Paper,
} from "@mui/material";
import FeedbackAccordion from "./_components/feedback-accordion";
import dayjs from "dayjs";

import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(customParseFormat);
dayjs.extend(utc);
dayjs.extend(localizedFormat);

const FeedbackForm = async ({ params }: { params: any }) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/forms/${params.feedbackId}`
  ).then((res) => res.json());

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
        <Stack
          sx={{
            justifyContext: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" sx={{ fontSize: 56, fontWeight: 800 }}>
            {data.views}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.2px" }}
          >
            Views
          </Typography>
        </Stack>
        <Stack
          sx={{
            justifyContext: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h2" sx={{ fontSize: 56, fontWeight: 800 }}>
            {data.submissions}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontSize: 16, fontWeight: 600, letterSpacing: "-0.2px" }}
          >
            Submissions
          </Typography>
        </Stack>
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
              <FeedbackAccordion formId={params.feedbackId} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FeedbackForm;
