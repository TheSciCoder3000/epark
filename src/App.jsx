import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import History from "./pages/History";
import Account from "./pages/Account";
import { AuthProvider } from './components/contexts/AuthProvider'

import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
