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
            This is About us page
          </Typography>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: "500",
              color: "primary.main",
            }}
          >
            This is a Next.js website with TypeScript, ESLint, Prettier, and
            Material UI
          </Typography>
        </Box>
      </Container>
    </main>
  );
}
