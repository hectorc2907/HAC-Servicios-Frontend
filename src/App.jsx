import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ServiceProvider } from "./context/ServiceContext";
import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminMainPage from "./page/admin/AdminMainPage";
import TripPage from "./page/admin/TripPage";
import SalePage from "./page/admin/SalePage";
import ClientPage from "./page/admin/ClientPage";
import BillsPage from "./page/admin/BillsPage";

export function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container mx-auto px-10 max-w-[1024px]">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminMainPage />} />
                <Route path="/trips" element={<TripPage />} />
                <Route path="/sale/:id" element={<SalePage />} />
                <Route path="/bills/:id" element={<BillsPage />} />
                <Route path="/client" element={<ClientPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </ServiceProvider>
    </AuthProvider>
  );
}
