import { Route, Routes } from 'react-router'
import './App.css'
import { AuthProvider } from './components/contexts/AuthContext'

import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
