import BluetoothProvider from './BluetoothProvider'
import BluetoothDialog from './BluetoothDialog'
import BluetoothAppBar from './BluetoothAppBar'

function App() {
  return (
    <BluetoothProvider>
      <BluetoothDialog />
      <BluetoothAppBar />
    </BluetoothProvider>
  )
}

export default App