import Box from "@mui/material/Box";

import SmartPuzzleProvider from "./components/SmartPuzzleProvider";
import ConnectionDialog from "./components/ConnectionDialog";
import MainGrid from "./components/MainGrid";
import ConnectionAppBar from "./components/ConnectionAppBar";

const App = () => {
  return (
    <SmartPuzzleProvider>
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
    </SmartPuzzleProvider>
  );
};

export default App;
