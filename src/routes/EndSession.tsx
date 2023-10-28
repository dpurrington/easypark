import { Navigation, SessionEnder } from "../components";
import { Container, Box } from "@mui/material";

export default function EndSession() {
  return (
    <Container maxWidth="md">
      <Box sx={{ minHeight: 600, paddingTop: 10 }}>
        <SessionEnder />
      </Box>
      <Navigation value="endSession" />
    </Container>
  );
}
