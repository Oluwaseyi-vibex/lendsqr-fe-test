import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login/Login';
import DashboardLayout from "./layouts/Dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserDetails from "./pages/UserDetails/UserDetails";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="users/:id" element={<UserDetails />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter >
  )
}

export default App
