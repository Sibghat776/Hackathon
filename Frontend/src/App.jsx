import './index.css'
import { Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import VerifyOTPPage from './Components/VerifyOTPPage'
import Home from './Pages/Home'
import Login from './Components/Login'
import About from './Components/About'
import AiAssistant from './Components/AiAssistant'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Contact from './Components/Contact'
import Reports from './Components/Reports'
import Dashboard from './Components/Dasboard'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='/assistant' element={<AiAssistant />} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route path='/verifyOtp' element={<VerifyOTPPage />} />
      </Routes>
    </>
  )
}

export default App
