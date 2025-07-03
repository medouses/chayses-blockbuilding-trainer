import { useReducer, useRef, useCallback, useEffect } from "react";
import { connectGanCube } from "gan-web-bluetooth";

import BluetoothContext from "../BluetoothContext";

// hardcoded bullshit for gan_web_bluetooth library
const PLACEHOLDER_CUBE_MAC_ADDRESS = "EC:FE:44:BA:E1:4A";
const customMacAddressProvider = () =>
  Promise.resolve(PLACEHOLDER_CUBE_MAC_ADDRESS);

const initialDeviceState = {
  isConnected: false,
  deviceName: "",
  deviceMac: "",
  // initialFacelets: "",
  // moveHistory: [],
};

const deviceReducer = (state, action) => {
  switch (action.type) {
    case "connected":
      return {
        ...state,
        isConnected: true,
        deviceName: action.conn.deviceName,
        deviceMac: action.conn.deviceMAC,
      };
    case "disconnected":
      return initialDeviceState;
  }
};

const BluetoothProvider = ({ children }) => {
  const [deviceState, dispatch] = useReducer(deviceReducer, initialDeviceState);

  const connectionRef = useRef(null);

  const handleDisconnect = () => {
    dispatch({ type: "disconnected" });
    connectionRef.current = null;
    console.log("bluetooth disconnected!");
  };

  const handleCubeEvent = (event) => {
    switch (event.type) {
      case "DISCONNECT":
        handleDisconnect();
        break;
      default:
        console.log("unhandled cube event recieved:", event);
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
        console.log("bluetooth connected!");

        // subscribe to rxjs events
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
    <BluetoothContext value={{ deviceState, connect, disconnect }}>
      {children}
    </BluetoothContext>
  );
};

export default BluetoothProvider;
