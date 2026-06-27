import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import DashboardLayout from "./layouts/Dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="users" element={<Use />>} /> */}
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
