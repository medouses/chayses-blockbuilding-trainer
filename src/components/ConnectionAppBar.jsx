import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import SmartCubeContext from "../SmartCubeContext";

const ConnectionAppBar = () => {
  const { smartCube, disconnect, reset } = useContext(SmartCubeContext);

  if (!smartCube.isConnected) {
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
        <Typography sx={{ mr: 3 }}>cube: {smartCube.deviceName}</Typography>
        <Typography sx={{ flexGrow: 1 }}>
          mac address: {smartCube.deviceMac}
        </Typography>
        <Button onClick={reset} sx={{ mr: 3 }}>
          reset to solved
        </Button>
        <Button onClick={disconnect}>disconnect cube</Button>
      </Toolbar>
    </AppBar>
  );
};

export default ConnectionAppBar;
