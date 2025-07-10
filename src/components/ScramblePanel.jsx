import { useContext } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { Alg } from "cubing/alg";

import SmartCubeContext from "../SmartCubeContext";
import ExerciseContext from "../ExerciseContext";

const ScramblePanel = () => {
  const { palette } = useTheme();

  const { smartCube } = useContext(SmartCubeContext);
  const { exercise } = useContext(ExerciseContext);

  // TODO: make this less fragile
  const formatScramble = (scramble) => {
    const simplifiedMoveHistory = Alg.fromString(
      smartCube.moveHistory.join(" ")
    )
      .experimentalSimplify({ cancel: true })
      .toString();
    const re = new RegExp(String.raw`^${simplifiedMoveHistory} `);

    const complete = scramble.match(re);
    const incomplete = scramble.replace(complete, "");

    return (
      <>
        <span style={{ color: palette.success.light }}>{complete}</span>
        <span>{incomplete}</span>
      </>
    );
  };

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" align="center">
        {exercise?.scramble
          ? formatScramble(exercise.scramble)
          : `click "next" for scramble`}
      </Typography>
    </Paper>
  );
};

export default ScramblePanel;
