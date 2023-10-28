import { Navigation, SessionsList } from "../components";
import { Container, Box } from "@mui/material";

export default function Sessions() {
  return (
    <Container maxWidth="md">
      <Box sx={{ minHeight: 600, paddingTop: 10 }}>
        <div id="detail">
          <SessionsList />
        </div>
      </Box>
      <Navigation value="sessions" />
    </Container>
  );
}
