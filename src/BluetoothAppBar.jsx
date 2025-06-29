import { useContext } from 'react'
import Slide from '@mui/material/Slide'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import BluetoothContext from './BluetoothContext'

function BluetoothAppBar() {
  const { connection, disconnect } = useContext(BluetoothContext)

  return (
    <Slide direction="up" in={connection} mountOnEnter unmountOnExit>
      <AppBar position='fixed' sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar variant='dense'>
          <Typography sx={{ mr: 3 }}>cube: {connection?.deviceName}</Typography>
          <Typography sx={{ flexGrow: 1 }}>mac address: {connection?.deviceMAC}</Typography>
          <Button onClick={disconnect}>disconnect cube</Button>
        </Toolbar>
      </AppBar>
    </Slide>
  )
}

export default BluetoothAppBar