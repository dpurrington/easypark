import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

interface NavValue {
  value: string;
}

// this is the common navigation component shown on all views
export default function Navigation(props: NavValue) {
  const [value, setValue] = React.useState(props.value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      showLabels
      sx={{ width: 852 }}
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
      <BottomNavigationAction label="Admin" value="sessions" href="/sessions" />
    </BottomNavigation>
  );
}
