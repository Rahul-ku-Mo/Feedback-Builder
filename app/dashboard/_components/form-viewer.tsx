"use client";

import { Grid, Paper, Skeleton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AddCard from "./add-card";
import FormCard from "./form-card";
import FeedbackFormModal from "@/app/feedback/[feedbackId]/_components/feedback-form";

const FormViewer = () => {
  const { data: forms, isPending } = useQuery({
    queryKey: ["forms"],
    queryFn: async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/forms`);
      const data = await response.json();
      return data;
    },
  });

  return (
    <Grid
      container
      spacing={2}
      sx={{
        padding: "60px 10px 10px 10px",
      }}
    >
      <Grid item>
        <Paper elevation={5}>
          <AddCard />
        </Paper>
      </Grid>
      {isPending ? (
        <Grid item>
          <Skeleton variant="rectangular" width={280} height={328} />
        </Grid>
      ) : (
        <>
          {forms?.map((form: any) => {
            return (
              <Grid item key={form.id}>
                <Paper elevation={5}>
                  <FormCard
                    id={form.id}
                    slug={form.slug}
                    title={form.title}
                    views={form.views}
                    submissions={form.submissions}
                    publishedAt={form.publishedAt}
                    isPublished={form.isPublished}
                    {...form}
                  />
                </Paper>
              </Grid>
            );
          })}
        </>
      )}
    </Grid>
  );
};

export default FormViewer;
