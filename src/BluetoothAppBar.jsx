import { useContext } from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import BluetoothContext from './BluetoothContext'

function BluetoothAppBar() {
  const { connectionRef, disconnect } = useContext(BluetoothContext)

  return (
    <AppBar position='fixed' sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar variant='dense'>
        <Typography sx={{ mr: 3 }}>cube: {connectionRef.deviceName}</Typography>
        <Typography sx={{ flexGrow: 1 }}>mac address: {connectionRef.deviceMAC}</Typography>
        <Button onClick={disconnect}>disconnect cube</Button>
      </Toolbar>
    </AppBar>
  )
}

export default BluetoothAppBar