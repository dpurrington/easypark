import Navigation from "../components/Navigation";
import SessionCreator from "../components/SessionCreator";
import { Container, Box } from "@mui/material";

export default function CreateSession() {
  return (
    <Container maxWidth="md">
      <Box sx={{ minHeight: 600, paddingTop: 10 }}>
        <SessionCreator />
      </Box>
      <Navigation value="createSession" />
    </Container>
  );
}
