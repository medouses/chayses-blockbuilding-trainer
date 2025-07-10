import Box from "@mui/material/Box";

import SmartCubeProvider from "./components/SmartCubeProvider";
import ConnectionDialog from "./components/ConnectionDialog";
import ExerciseProvider from "./components/ExerciseProvider";
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
        <ExerciseProvider>
          <MainGrid />
        </ExerciseProvider>
        <ConnectionAppBar />
      </Box>
    </SmartCubeProvider>
  );
};

export default App;
