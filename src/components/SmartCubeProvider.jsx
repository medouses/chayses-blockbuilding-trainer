import { useReducer, useRef, useCallback, useEffect } from "react";
import { connectGanCube } from "gan-web-bluetooth";

import SmartCubeContext from "../SmartCubeContext";

// hardcoded bullshit for gan_web_bluetooth library
const PLACEHOLDER_CUBE_MAC_ADDRESS = "EC:FE:44:BA:E1:4A";
const customMacAddressProvider = () =>
  Promise.resolve(PLACEHOLDER_CUBE_MAC_ADDRESS);

const initialDeviceState = {
  isConnected: false,
  deviceName: "",
  deviceMac: "",
  lastFacelets: "",
  moveHistory: [],
};

const deviceStateReducer = (state, action) => {
  switch (action.type) {
    case "facelets_recieved":
      return {
        ...state,
        lastFacelets: action.facelets,
        moveHistory: [],
      };
    case "move_recieved":
      return {
        ...state,
        moveHistory: state.moveHistory.concat(action.move),
      };
    case "disconnected":
      return initialDeviceState;
    case "connected":
      return {
        ...state,
        isConnected: true,
        deviceName: action.conn.deviceName,
        deviceMac: action.conn.deviceMAC,
      };
  }
};

const SmartCubeProvider = ({ children }) => {
  const [deviceState, dispatch] = useReducer(
    deviceStateReducer,
    initialDeviceState
  );

  const connectionRef = useRef(null);

  const handleFacelets = (event) => {
    dispatch({ type: "facelets_recieved", facelets: event.facelets });
    console.debug("facelets event handled:", event);
  };

  const handleMove = (event) => {
    dispatch({ type: "move_recieved", move: event.move });
    console.debug("move event handled:", event);
  };

  const handleDisconnect = () => {
    dispatch({ type: "disconnected" });
    connectionRef.current = null;
    console.debug("bluetooth disconnected!");
  };

  const handleCubeEvent = (event) => {
    switch (event.type) {
      case "FACELETS":
        handleFacelets(event);
        break;
      case "MOVE":
        handleMove(event);
        break;
      case "DISCONNECT":
        handleDisconnect();
        break;
      default:
        console.debug("unhandled cube event recieved:", event);
    }
  };

  const disconnect = useCallback(async () => {
    await connectionRef.current?.disconnect();
  }, []);

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

  useEffect(() => () => disconnect(), [disconnect]);

  return (
    <SmartCubeContext value={{ deviceState, connect, disconnect }}>
      {children}
    </SmartCubeContext>
  );
};

export default SmartCubeProvider;
