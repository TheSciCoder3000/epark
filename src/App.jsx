import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Map from "./pages/Map";
import Account from "./pages/Account";
import "./components/styles.css";

export default function App() {
  return (
    <div className="container">
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
    </div>
  );
}