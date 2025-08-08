import './index.css'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import VerifyOTPPage from './Components/VerifyOTPPage'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path='/verifyOtp' element={<VerifyOTPPage />} />
      </Routes>
    </>
  )
}

export default App
