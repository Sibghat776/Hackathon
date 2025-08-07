import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
// import Login from './Components/Login.jsx'
import { ToastContainer } from 'react-toastify'
import VerifyOTPPage from './Components/VerifyOTPPage.jsx'
import  Home  from './Pages/Home.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path='/verifyOtp'  element={<VerifyOTPPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        {/* <Route path='/login' element={<Login />} /> */}
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
