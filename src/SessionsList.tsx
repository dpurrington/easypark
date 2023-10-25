import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "./firebase";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "plate",
    headerName: "Plate",
    width: 150,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Tel",
    width: 150,
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    editable: true,
  },
  {
    field: "entry",
    headerName: "Entered",
    sortable: false,
    width: 160,
  },
  {
    field: "exit",
    headerName: "Exited",
    sortable: false,
    width: 160,
  },
];

const db = getDatabase(app);
const sessionRef = ref(db, "sessions");

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
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={sessions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
