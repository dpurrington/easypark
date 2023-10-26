import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { newSession, createSession } from "./data/sessions";

interface SessionCreatorState {
  plate: string;
  phone: string;
  phoneProps: { error: boolean };
  plateProps: { error: boolean };
  valid: boolean;
}

function validateState(state: SessionCreatorState) {
  const retval = structuredClone(state);
  // verify only digits
  retval.phoneProps.error = !state.phone.match("^\\d*$");

  retval.valid = !(retval.phoneProps.error || retval.plateProps.error);
  return retval;
}

export default function SessionCreator(this: React.Component) {
  const initialState: SessionCreatorState = {
    phoneProps: { error: false },
    plateProps: { error: false },
    plate: "",
    phone: "",
    valid: true,
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
    setState(validateState(state));

    if (state.valid) {
      // create session (could fail due to existing session)
      createSession(newSession(state.plate, state.phone));
    }

    console.log("handled submit");
  };

  const set: any = (name: string) => {
    return ({ target: { value } }: any) => {
      setState((oldValues: SessionCreatorState) =>
        validateState({
          ...oldValues,
          [name]: value,
        })
      );
    };
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
      <div className="session-creator">
        <TextField
          {...state.plateProps}
          required
          id="plate"
          label="Plate"
          value={state.plate}
          onChange={set("plate")}
        />
        <TextField
          helperText="Please use only digits."
          {...state.phoneProps}
          required
          id="phone"
          label="Phone"
          value={state.phone}
          onChange={set("phone")}
        />
        <Button variant="contained" color="success" type="submit">
          Begin Session
        </Button>
      </div>
    </Box>
  );
}
