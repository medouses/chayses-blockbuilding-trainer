import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import BluetoothContext from "../BluetoothContext";

function ConnectionAppBar() {
  const { connection, disconnect } = useContext(BluetoothContext);

  // show an error message instead if connection is null
  if (!connection) {
    return (
      <AppBar position="static" color="error" enableColorOnDark>
        <Toolbar variant="dense">
          <Typography align="center" sx={{ flexGrow: 1 }}>
            no cube connected
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography sx={{ mr: 3 }}>cube: {connection.deviceName}</Typography>
        <Typography sx={{ flexGrow: 1 }}>
          mac address: {connection.deviceMAC}
        </Typography>
        <Button onClick={disconnect}>disconnect cube</Button>
      </Toolbar>
    </AppBar>
  );
}

export default ConnectionAppBar;
