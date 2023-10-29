import { Snackbar, Alert, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { endSession } from "../data/sessions";

interface SessionEnderState {
  plate: string;
  valid: boolean;
  submitError?: string;
}

export default function SessionEnder(this: React.Component) {
  const initialState: SessionEnderState = {
    plate: "",
    valid: false,
  };
  const [state, setState] = useState(initialState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);

    if (state.valid) {
      // create session (could fail due to existing session)
      const { success, error } = await endSession(state.plate);
      if (!success) {
        console.log(error);
        setOpenErrorSnackbar(true);
        setState({ ...state, valid: false, submitError: error });
      } else {
        setOpenSnackbar(true);
        setState(initialState);
      }
    }
  };

  const validateState = (newState: SessionEnderState) => {
    const retval = structuredClone(newState);
    retval.valid = retval.plate.length > 0;
    return retval;
  };

  const set: any = (name: string) => {
    return ({ target: { value } }: any) => {
      setState((oldValues: SessionEnderState) => {
        return validateState({
          ...oldValues,
          [name]: value,
        });
      });
    };
  };

  const resetSnackbars = () => {
    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  return (
    <Box
      component="form"
      autoComplete="off"
      onSubmit={handleSubmit}
      justifyContent="space-between"
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <h1>Parking Checkout</h1>
      </Box>
      <Snackbar
        open={openErrorSnackbar}
        autoHideDuration={6000}
        onClose={resetSnackbars}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error">{state.submitError}</Alert>
      </Snackbar>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={resetSnackbars}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">
          Checkout complete! We hope you enjoyed your stay with us.
        </Alert>
      </Snackbar>
      <Box display="flex" justifyContent="center">
        <TextField
          autoFocus
          required
          id="plate"
          label="Plate"
          value={state.plate}
          onChange={set("plate")}
        />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ paddingTop: 3 }}
      >
        <Button
          disabled={!state.valid || !state.plate}
          variant="contained"
          color="success"
          type="submit"
        >
          End Session
        </Button>
      </Box>
    </Box>
  );
}
