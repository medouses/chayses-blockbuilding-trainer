import { useRef, useContext, useEffect } from "react";
import { TwistyPlayer } from "cubing/twisty";
import Paper from "@mui/material/Paper";

import BluetoothContext from "../BluetoothContext";

function CubeDisplay({ minHeight }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const subscriptionRef = useRef(null);

  const { connection } = useContext(BluetoothContext);

  function handleCubeEvent(event) {
    // when cube is moved, show it on the player
    if (event.type == "MOVE") {
      playerRef.current?.experimentalAddMove(event.move, { cancel: false });
    }
  }

  // keep track of rxjs event subscription in a ref guard
  if (!connection) {
    subscriptionRef.current = null;
  } else if (!subscriptionRef.current) {
    subscriptionRef.current = connection.events$.subscribe(handleCubeEvent);
  }

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

      // must unsub manually as connection may still exist
      subscriptionRef.current?.unsubscribe();
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
}

export default CubeDisplay;
