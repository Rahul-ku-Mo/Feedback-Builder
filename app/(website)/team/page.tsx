import Image from "next/image";
import styles from "./page.module.css";
import { Container, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <main style={{ background: "transparent" }}>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: "6rem",
              fontWeight: "bold",
              color: "primary.main",
              mt: 4,
            }}
          >
            Welcome to Teams
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "500",
              color: "primary.main",
            }}
          >
            Here are the teams you will be working with
          </Typography>
        </Box>
      </Container>
    </main>
  );
}
