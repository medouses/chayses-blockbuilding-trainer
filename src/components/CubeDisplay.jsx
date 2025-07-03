import { useRef, useEffect } from "react";
import { TwistyPlayer } from "cubing/twisty";
import Paper from "@mui/material/Paper";

const CubeDisplay = ({ minHeight }) => {
  const containerRef = useRef(null);
  const playerRef = useRef(null);

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

export default CubeDisplay;
