import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";
import { endSession } from "../data/sessions";

interface SessionEnderState {
  plate: string;
  valid: boolean;
  error?: string;
}

function validateState(state: SessionEnderState) {
  const retval = structuredClone(state);
  // TODO: add validation
  // retval.valid = retval.plate.length > 0;
  retval.valid = true;
  return retval;
}

export default function SessionEnder(this: React.Component) {
  const initialState: SessionEnderState = {
    plate: "",
    valid: false,
  };
  const [state, setState] = useState(initialState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);

    if (state.valid) {
      // create session (could fail due to existing session)
      const { success, error } = await endSession(state.plate);
      if (!success) {
        console.log(error);
        setState({ ...state, valid: false, error: error });
      } else {
        setState(initialState);
      }
    }

    console.log("handled submit");
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

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <h1>End Session</h1>
      <div className="session-ender">
        <TextField
          required
          id="plate"
          label="Plate"
          value={state.plate}
          onChange={set("plate")}
        />
        <Button
          disabled={!state.valid || !state.plate}
          variant="contained"
          color="success"
          type="submit"
        >
          End Session
        </Button>
      </div>
    </Box>
  );
}
