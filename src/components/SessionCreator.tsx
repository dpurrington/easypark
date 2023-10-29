import { Alert, Snackbar, TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { newSession, createSession } from "../data/sessions";

interface SessionCreatorState {
  plate: string;
  phone: string;
  phoneProps: { error: boolean };
  plateProps: { error: boolean };
  valid: boolean;
  submitError?: string;
}

// this function is used to validate input prior to submission
const validateFormState = (state: SessionCreatorState) => {
  // make a deep copy - we want to return a new object, not product side-effects
  const retval = structuredClone(state);

  // verify only digits and at least 10 digits
  retval.phoneProps.error =
    !state.phone.match("^\\d*$") || state.phone.length < 10;

  retval.valid = !(retval.phoneProps.error || retval.plateProps.error);
  return retval;
};

// the state object at the beginning
const initialState: SessionCreatorState = {
  phoneProps: { error: false },
  plateProps: { error: false },
  plate: "",
  phone: "",
  valid: true,
};

export default function SessionCreator() {
  const [state, setState] = useState(initialState);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState(validateFormState(state));

    if (state.valid) {
      // create session (could fail due to existing session)
      const { success, error } = await createSession(
        newSession(state.plate, state.phone)
      );

      if (success) {
        setOpenSuccessSnackbar(true);
        setState(initialState);
      } else {
        setOpenErrorSnackbar(true);
        setState({ ...state, submitError: error });
      }
    }
  };

  // updates any value passed in and updates
  // the state
  const set: any = (name: string) => {
    return ({ target: { value } }: any) => {
      setState((oldValues: SessionCreatorState) =>
        validateFormState({
          ...oldValues,
          [name]: value,
        })
      );
    };
  };

  // closes the snackbars (so we don't try to open again)
  const resetSnackbars = () => {
    setOpenSuccessSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <h1>Parking Check-in</h1>
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
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={resetSnackbars}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success">
          Check-in complete. Please enjoy your stay!
        </Alert>
      </Snackbar>
      <Box display="flex" justifyContent="center" alignItems="space-between">
        <TextField
          {...state.plateProps}
          required
          id="plate"
          label="Plate"
          value={state.plate}
          onChange={set("plate")}
          autoFocus
        />
        <TextField
          helperText="Please provide a minimum of ten digits (and digits only)."
          {...state.phoneProps}
          required
          id="phone"
          label="Phone"
          value={state.phone}
          onChange={set("phone")}
        />
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Button
          disabled={!state.valid || !state.phone || !state.plate}
          variant="contained"
          color="success"
          type="submit"
        >
          Check In
        </Button>
      </Box>
    </Box>
  );
}
