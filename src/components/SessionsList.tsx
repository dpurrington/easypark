import * as React from "react";
import Box from "@mui/material/Box";
import {
  GridToolbarContainer,
  GridToolbarExport,
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../firebase";

const columns: GridColDef[] = [
  {
    field: "plate",
    headerName: "Plate",
    width: 150,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
  },
  {
    field: "enter",
    headerName: "Entered",
    sortable: true,
    width: 160,
  },
  {
    field: "exit",
    headerName: "Exited",
    sortable: true,
    width: 160,
  },
];

const db = getDatabase(app);
const sessionRef = ref(db, "sessions");
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function SessionsList() {
  const [sessions, setSessions] = React.useState([]);
  React.useEffect(() => {
    onValue(sessionRef, (snapshot) => {
      const data: any = snapshot.val();
      console.log(data);
      setSessions(Object.values(data));
    });
  }, []);

  return (
    <Box sx={{ maxHeight: 800, width: "100%" }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <h1>Sessions</h1>
      </Box>
      <DataGrid
        slots={{
          toolbar: CustomToolbar,
        }}
        rows={sessions}
        columns={columns}
        initialState={{
          filter: {
            filterModel: {
              items: [{ field: "status", operator: "equals", value: "active" }],
            },
          },
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
