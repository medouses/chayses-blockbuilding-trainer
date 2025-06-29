import { useContext } from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import BluetoothContext from './BluetoothContext'

function BluetoothDialog() {
  const { isConnected, connect } = useContext(BluetoothContext)

  return (
    <Dialog
      open={!isConnected}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>
         {'no cube connected'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          to use this app, please connect a compatible smartcube
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={connect}>connect cube</Button>
      </DialogActions>
    </Dialog>
  )
}

export default BluetoothDialog