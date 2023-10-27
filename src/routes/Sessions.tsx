import { Navigation, SessionsList } from "../components";
import { Container, Box } from "@mui/material";

export default function Sessions() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: 800 }}>
        <div id="detail">
          <SessionsList />
        </div>
      </Box>
      <Navigation value="sessions" />
    </Container>
  );
}
