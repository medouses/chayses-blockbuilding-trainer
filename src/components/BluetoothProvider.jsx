import { useState, useEffect } from "react";
import { connectGanCube } from "gan-web-bluetooth";

import BluetoothContext from "../BluetoothContext";

// hardcoded bullshit for gan_web_bluetooth library
const PLACEHOLDER_CUBE_MAC_ADDRESS = "EC:FE:44:BA:E1:4A";
const customMacAddressProvider = () =>
  Promise.resolve(PLACEHOLDER_CUBE_MAC_ADDRESS);

// TODO: refactor out a useCubeEvent hook?
function BluetoothProvider({ children }) {
  const [connection, setConnection] = useState(null);

  function handleDisconnect() {
    setConnection(null);
    console.log("bluetooth disconnected!");
  }

  function handleCubeEvent(event) {
    // clean up gracefully after disconnect event, else just log what was recieved
    if (event.type == "DISCONNECT") handleDisconnect();
    else console.log("cube event recieved:", event);
  }

  async function connect() {
    try {
      const conn = await connectGanCube(customMacAddressProvider);
      setConnection(conn);
      console.log("bluetooth connected!");

      conn.events$.subscribe(handleCubeEvent);
      await conn.sendCubeCommand({ type: "REQUEST_FACELETS" });
    } catch (err) {
      console.error("bluetooth connection failed:", err);
    }
  }

  function disconnect() {
    if (connection) connection.disconnect();
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => disconnect(), []);

  return (
    <BluetoothContext value={{ connection, connect, disconnect }}>
      {children}
    </BluetoothContext>
  );
}

export default BluetoothProvider;
