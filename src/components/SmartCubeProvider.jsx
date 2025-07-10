import { useReducer, useRef, useCallback, useEffect } from "react";
import { connectGanCube } from "gan-web-bluetooth";

import SmartCubeContext from "../SmartCubeContext";
import { faceletsToScramble } from "../utils";

// hardcoded bullshit for gan_web_bluetooth library
const PLACEHOLDER_CUBE_MAC_ADDRESS = "EC:FE:44:BA:E1:4A";
const customMacAddressProvider = () =>
  Promise.resolve(PLACEHOLDER_CUBE_MAC_ADDRESS);

const initialSmartCubeState = {
  isConnected: false,
  deviceName: "",
  deviceMac: "",
  initialAlg: "",
  moveHistory: [],
};

const smartCubeReducer = (state, action) => {
  switch (action.type) {
    case "connected":
      return {
        ...state,
        isConnected: true,
        deviceName: action.conn.deviceName,
        deviceMac: action.conn.deviceMAC,
      };
    case "disconnected":
      return initialSmartCubeState;
    case "facelets_recieved":
      return {
        ...state,
        initialAlg: action.alg,
        moveHistory: [],
      };
    case "move_recieved":
      return {
        ...state,
        moveHistory: state.moveHistory.concat(action.move),
      };
  }
};

const SmartCubeProvider = ({ children }) => {
  const [smartCube, dispatch] = useReducer(
    smartCubeReducer,
    initialSmartCubeState
  );

  const connectionRef = useRef(null);

  const handleDisconnect = () => {
    dispatch({ type: "disconnected" });
    connectionRef.current = null;
    console.debug("bluetooth disconnected!");
  };

  const handleFacelets = async (event) => {
    const scramble = await faceletsToScramble(event.facelets);

    dispatch({ type: "facelets_recieved", alg: scramble });
    console.debug("facelets event handled:", event);
  };

  const handleMove = (event) => {
    dispatch({ type: "move_recieved", move: event.move });
    console.debug("move event handled:", event);
  };

  const handleCubeEvent = (event) => {
    switch (event.type) {
      case "DISCONNECT":
        handleDisconnect();
        break;
      case "FACELETS":
        handleFacelets(event);
        break;
      case "MOVE":
        handleMove(event);
        break;
      default:
        console.debug("unhandled cube event recieved:", event);
    }
  };

  const connect = async () => {
    await connectGanCube(customMacAddressProvider).then(
      async (conn) => {
        await disconnect();

        dispatch({ type: "connected", conn: conn });
        connectionRef.current = conn;
        console.debug("bluetooth connected!");

        // subscribe to rxjs events and request initial facelets state
        conn.events$.subscribe(handleCubeEvent);
        await conn.sendCubeCommand({ type: "REQUEST_FACELETS" });
      },
      (err) => {
        console.error("bluetooth connection failed:", err);
      }
    );
  };

  const disconnect = useCallback(async () => {
    await connectionRef.current?.disconnect();
  }, []);

  const reset = async () => {
    await connectionRef.current?.sendCubeCommand({ type: "REQUEST_RESET" });
  };

  useEffect(() => () => disconnect(), [disconnect]);

  return (
    <SmartCubeContext value={{ smartCube, connect, disconnect, reset }}>
      {children}
    </SmartCubeContext>
  );
};

export default SmartCubeProvider;
