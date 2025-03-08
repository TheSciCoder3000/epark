import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Account from "./pages/Account";
import { AuthProvider } from './components/contexts/AuthProvider'

import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute role="User" />}>
          <Route index element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
