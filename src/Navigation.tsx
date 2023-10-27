import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export default function Navigation() {
  const [value, setValue] = React.useState("createSession");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      showLabels
      sx={{ width: 500 }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Check-in"
        value="createSession"
        href="/createSession"
      />
      <BottomNavigationAction
        label="Check-out"
        value="endSession"
        href="/endSession"
      />
      <BottomNavigationAction
        label="Admin"
        value="listSessions"
        href="/sessions"
      />
    </BottomNavigation>
  );
}
