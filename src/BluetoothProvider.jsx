import { useState, useRef, useEffect } from 'react'
import { connectGanCube } from 'gan-web-bluetooth'

import BluetoothContext from './BluetoothContext'

const CUBE_MAC_ADDRESS = 'EC:FE:44:BA:E1:4A'

function BluetoothProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false)
  const connectionRef = useRef(null)

  function handleDisconnect() {
    connectionRef.current = null

    console.log('bluetooth disconnected!')
    setIsConnected(false)
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
      connectionRef.current = conn

      console.log('bluetooth connected!')
      setIsConnected(true)

      conn.events$.subscribe(handleCubeEvent)
      await conn.sendCubeCommand({ type: 'REQUEST_FACELETS' })
    } catch (err) {
      console.error('bluetooth connection failed -', err)
    }
      
  }

  function disconnect() {
    if (connectionRef.current) connectionRef.current.disconnect()
  }

  useEffect(() => () => disconnect(), [])

  return (
    <BluetoothContext value={{ isConnected, connectionRef, connect, disconnect }}>
      {children}
    </BluetoothContext>
  );
};

export default BluetoothProvider