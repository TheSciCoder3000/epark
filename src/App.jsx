import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import History from "./pages/History";
import Account from "./pages/Account";
import { AuthProvider } from './components/contexts/AuthProvider'
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from "./pages/NotFound";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminHistory from "./pages/Admin/AdminHistory";
import AdminParkingLot from "./pages/Admin/AdminParkingLot";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoute role="User" />}>
          <Route index element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/account" element={<Account />} />
        </Route>

        <Route element={<ProtectedRoute role="Admin" />}>
          <Route path="/admin-dashboard" element={<DashboardAdmin />} />
          <Route path="/admin-settings" element={<AdminSettings />} />
          <Route path="/admin-history" element={<AdminHistory />} />
          <Route path="/admin-parkinglots" element={<AdminParkingLot />} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
