import { useRef, useContext, useEffect } from "react";
import Paper from "@mui/material/Paper";
import { TwistyPlayer } from "cubing/twisty";
import { experimentalSolve3x3x3IgnoringCenters } from "cubing/search";
import { faceletsToPattern } from "gan-cube-sample-utils";

import SmartCubeContext from "../SmartCubeContext";

const TwistyPlayerPanel = ({ minHeight }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

  const { deviceState } = useContext(SmartCubeContext);
  const { lastFacelets } = deviceState;

  useEffect(() => {
    const setFacelets = async () => {
      const kPattern = faceletsToPattern(lastFacelets);
      const solution = await experimentalSolve3x3x3IgnoringCenters(kPattern);
      const scramble = solution.invert();

      playerRef.current.alg = scramble;
      console.debug("twistyplayer alg updated:", scramble);
    };

    if (playerRef.current && lastFacelets) {
      setFacelets().catch(console.error);
    }
  }, [lastFacelets]);

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
