"use client";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, Stack } from "@mui/material";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";
import { useFormStore } from "@/providers/form-store-provider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DeleteCardModal from "./delete-card-modal";
import dayjs from "dayjs";

type ViewAnalyticsProps = {
  label?: string;
  value?: string | number;
  
};

const ViewAnalytics: React.FC<ViewAnalyticsProps> = ({
  label = "Submitted",
  value = "21",
}) => {
  return (
    <>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            opacity: 0.5,
            fontSize: 12,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            alignSelf: "flex-end",
            textAlign: "right",
            fontSize: 12,
          }}
        >
          {value}
        </Typography>
      </Stack>
    </>
  );
};

const FormCard = ({
  id,
  slug,
  title,
  views,
  submissions,
  isPublished,
  publishedAt,
}: {
  id: string;
  slug: string;
  title: string;
  views: number;
  submissions: number;
  isPublished: boolean;
  publishedAt: any;
  showOnSpecificDate: boolean;
  specificDate?: any;
  showOnSpecificTime: boolean;
  specificTime?: any;
  showOnSpecificURL: boolean;
  specifcURL?: string;
}) => {
  const { selectForm } = useFormStore((state) => state);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const formattedDate = publishedAt !== null ? dayjs(publishedAt).format("DD/MM/YYYY") : "Not Published yet";


  return (
    <Card sx={{ width: 280, height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: 60,
          backgroundColor: "#e1ad01",
        }}
      >
        <FindInPageTwoToneIcon
          color="primary"
          sx={{
            fontSize: 45,
            cursor: "pointer",
            background: "white",
            borderRadius: "50%",
            padding: "5px",
          }}
        />
      </Box>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        <Stack
          spacing={1}
          sx={{
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {title}
          </Typography>
          <ViewAnalytics label="Viewed" value={views} />
          <ViewAnalytics label="Submitted" value={submissions} />
          <ViewAnalytics
              label="Date Published"
              value={formattedDate}
            />
        </Stack>
        <Stack spacing={2}>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              router.push(`/feedback/${id}`);
            }}
          >
            VIEW SUBMISSION
          </Button>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                selectForm(id);

                router.push(`/dashboard/${id}`);
              }}
            >
              EDIT
            </Button>
            <>
              <Button variant="contained" onClick={handleOpen}>
                DELETE
              </Button>
              <DeleteCardModal open={open} handleClose={handleClose} id={id} />
            </>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default FormCard;
