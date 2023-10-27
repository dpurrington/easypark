import Navigation from "../components/Navigation";
import SessionCreator from "../components/SessionCreator";
import { Container, Box } from "@mui/material";
export default function CreateSession() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ minHeight: 800 }}>
        <SessionCreator />
      </Box>
      <Navigation value="createSession" />
    </Container>
  );
}
