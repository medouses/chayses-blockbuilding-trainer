import Box from "@mui/material/Box";

import BluetoothProvider from "./components/BluetoothProvider";
import ConnectionDialog from "./components/ConnectionDialog";
import MainGrid from "./components/MainGrid";
import ConnectionAppBar from "./components/ConnectionAppBar";

function App() {
  return (
    <BluetoothProvider>
      <ConnectionDialog />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <MainGrid />
        <ConnectionAppBar />
      </Box>
    </BluetoothProvider>
  );
}

export default App;
