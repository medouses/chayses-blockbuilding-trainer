import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CubeDisplay from "./CubeDisplay";

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
          <Paper sx={{ padding: 2 }}>
            <Typography variant="h6">test</Typography>
          </Paper>
        </Grid>
        <Grid size={6}>
          <CubeDisplay minHeight="30vh" />
        </Grid>
        <Grid size={6}>
          <Paper sx={{ padding: 2, minHeight: "30vh" }} />
        </Grid>
        <Grid size={12}>
          <Paper sx={{ padding: 2 }}>
            <Button>test</Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainGrid;
