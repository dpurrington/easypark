import { Navigation } from "../components";
import { Container, Box } from "@mui/material";
export default function EndSession() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: 800 }}></Box>
      <Navigation value="endSession" />
    </Container>
  );
}
