"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Skeleton,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const FeedbackAccordion = ({ formId }: { formId: string }) => {
  const { data: feedbacks, isPending } = useQuery({
    queryKey: ["feedbacks", formId],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:3000/api/submissions/${formId}`
      );

      const feedbacks = await response.json();

      return feedbacks;
    },
  });
  
  return (
    <>
      {isPending ? (
        <Skeleton height={40} width={"100%"} />
      ) : (
        <>
          {feedbacks?.map((feedback: any, index: number) => (
            <Accordion key={feedback.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                key={feedback.id}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#1976b2",
                    }}
                  >
                    Feedback {index + 1}
                  </Typography>
                  <Typography variant="body2">
                    {new Date(feedback.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                {feedback.message?.map((msg: any) => {
                  return (
                    <Stack spacing={0.5} key={msg.id}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {msg.label}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.7 }}>
                        {msg.value}
                      </Typography>
                    </Stack>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </>
  );
};

export default FeedbackAccordion;
