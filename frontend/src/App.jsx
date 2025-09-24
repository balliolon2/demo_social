import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './components/Register' // ไม่ต้องมี .jsx ถ้าเป็นไฟล์ JS
import Login from './components/Login'
import Dashboard from './components/Dashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to='/login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
