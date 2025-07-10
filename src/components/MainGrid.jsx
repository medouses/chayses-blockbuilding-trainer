import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import ScramblePanel from "./ScramblePanel";
import TwistyPlayerPanel from "./TwistyPlayerPanel";
import OptionsPanel from "./OptionsPanel";

const MainGrid = () => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} sx={{ width: "50vw" }}>
        <Grid size={12}>
          <ScramblePanel />
        </Grid>
        <Grid size={6}>
          <TwistyPlayerPanel minHeight="30vh" />
        </Grid>
        <Grid size={6}>
          <Paper sx={{ padding: 2, minHeight: "30vh" }} />
        </Grid>
        <Grid size={12}>
          <OptionsPanel />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainGrid;
