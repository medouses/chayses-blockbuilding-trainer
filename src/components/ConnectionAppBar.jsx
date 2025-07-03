import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import BluetoothContext from "../BluetoothContext";

const ConnectionAppBar = () => {
  const { deviceState, disconnect } = useContext(BluetoothContext);

  // show an error message if not connected
  if (!deviceState.isConnected) {
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
        <Typography sx={{ mr: 3 }}>cube: {deviceState.deviceName}</Typography>
        <Typography sx={{ flexGrow: 1 }}>
          mac address: {deviceState.deviceMac}
        </Typography>
        <Button onClick={disconnect}>disconnect cube</Button>
      </Toolbar>
    </AppBar>
  );
};

export default ConnectionAppBar;
