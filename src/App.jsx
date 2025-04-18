import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import History from "./pages/User/History";
import Account from "./pages/Account";
import { AuthProvider } from './components/contexts/Auth/AuthProvider'
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from "./pages/NotFound";
import AdminSettings from "./pages/Admin/AdminSettings";
import AdminHistory from "./pages/Admin/AdminHistory";
import AdminParkingLot from "./pages/Admin/AdminParkingLot";
import Transaction from "./pages/User/Transaction";
import TransactionSuccess from "./pages/User/TransactionSuccess";
import ReservationProvider from "./components/contexts/Reservation/ReservationProvider";


function App() {
  return (
    <AuthProvider>
      <ReservationProvider>

        <Routes>
          <Route element={<ProtectedRoute role="User" />}>
            <Route index element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/account" element={<Account />} />
            <Route path="/transaction" element={<Transaction />} />
            <Route path="/transaction-success/:id" element={<TransactionSuccess />} />
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
      </ReservationProvider>
    </AuthProvider>
  )
}

export default App
