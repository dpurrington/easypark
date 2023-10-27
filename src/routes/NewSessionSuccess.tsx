import { Navigation } from "../components";
import { Container, Alert, Box } from "@mui/material";
export default function EndSession() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: 800 }}>
        <Alert severity="success">Checked in!</Alert>
      </Box>
      <Navigation value="createSession" />
    </Container>
  );
}
