import { useState, useEffect } from 'react'
import { connectGanCube } from 'gan-web-bluetooth'

import BluetoothContext from './BluetoothContext'

const CUBE_MAC_ADDRESS = 'EC:FE:44:BA:E1:4A'

function BluetoothProvider({ children }) {
  const [connection, setConnection] = useState(null)

  function handleDisconnect() {
    setConnection(null)
    console.log('bluetooth disconnected!')
  }

  function handleCubeEvent(event) {
    if (event.type == 'DISCONNECT')
      handleDisconnect()
    else
      console.log('cube event recieved -', event)
  }

  async function connect() {
    try {
      const customMacAddressProvider = () => Promise.resolve(CUBE_MAC_ADDRESS)
      const conn = await connectGanCube(customMacAddressProvider)
      setConnection(conn)
      console.log('bluetooth connected!')

      conn.events$.subscribe(handleCubeEvent)
      await conn.sendCubeCommand({ type: 'REQUEST_FACELETS' })
    } catch (err) {
      console.error('bluetooth connection failed -', err)
    }
  }

  function disconnect() {
    if (connection) connection.disconnect()
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => disconnect(), [])

  return (
    <BluetoothContext value={{ connection, connect, disconnect }}>
      {children}
    </BluetoothContext>
  );
};

export default BluetoothProvider