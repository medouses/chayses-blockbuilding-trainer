import { useRef, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { TwistyPlayer } from "cubing/twisty";

import SmartCubeContext from "../SmartCubeContext";

const TwistyPlayerPanel = ({ minHeight }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  const { smartCube } = useContext(SmartCubeContext);
  const { initialAlg, moveHistory } = smartCube;

  useEffect(() => {
    if (playerRef.current && moveHistory.length == 0) {
      playerRef.current.alg = initialAlg;
      console.debug("twistyplayer initial alg set:", initialAlg);
    }
  }, [initialAlg, moveHistory]);

  useEffect(() => {
    if (playerRef.current && moveHistory.length > 0) {
      const lastMove = moveHistory.at(-1);

      playerRef.current.experimentalAddMove(lastMove, { cancel: false });
      console.debug("twistyplayer move added:", lastMove);
    }
  }, [moveHistory]);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!playerRef.current) {
      playerRef.current = new TwistyPlayer({
        background: "none",
        controlPanel: "none",
      });
    }

    const player = playerRef.current;

    if (!containerRef.current.contains(player)) {
      containerRef.current.appendChild(player);
    }

    return () => {
      player?.remove();
    };
  }, []);

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        minHeight: minHeight,
      }}
      ref={containerRef}
    />
  );
};

export default TwistyPlayerPanel;
