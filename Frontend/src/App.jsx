import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Components/Register'
import Login from './Components/Login.jsx'
import { Home } from './Pages/Home.jsx'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  )
}

export default App
