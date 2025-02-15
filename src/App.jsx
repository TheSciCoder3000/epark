import { Route, Routes } from 'react-router'
import './App.css'
import { AuthProvider } from './components/contexts/AuthContext'
import Login from './pages/Login'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
