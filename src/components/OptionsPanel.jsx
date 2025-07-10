import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import ExerciseContext from "../ExerciseContext";

const OptionsPanel = () => {
  const { next } = useContext(ExerciseContext);

  return (
    <Paper sx={{ padding: 2 }}>
      <Button onClick={next}>next</Button>
    </Paper>
  );
};

export default OptionsPanel;
