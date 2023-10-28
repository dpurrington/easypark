import * as React from "react";
import Box from "@mui/material/Box";
import {
  GridToolbarContainer,
  GridToolbarExport,
  DataGrid,
  GridColDef,
} from "@mui/x-data-grid";
import { subscribeToUpdates } from "../data/sessions";

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
    subscribeToUpdates((snapshot: any) => {
      const sessions: any = [];
      snapshot.forEach((doc: any) => {
        sessions.push(doc.data());
      });

      setSessions(sessions);
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
        pageSizeOptions={[10]}
        disableRowSelectionOnClick
      />
    </Box>
  );
}
