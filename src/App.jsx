import Box from "@mui/material/Box";

import SmartCubeProvider from "./components/SmartCubeProvider";
import ConnectionDialog from "./components/ConnectionDialog";
import MainGrid from "./components/MainGrid";
import ConnectionAppBar from "./components/ConnectionAppBar";

const App = () => {
  return (
    <SmartCubeProvider>
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
    </SmartCubeProvider>
  );
};

export default App;
