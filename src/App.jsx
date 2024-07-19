import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import AdminMainPage from "./page/admin/AdminMainPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import ClientPage from "./page/admin/ClientPage";
import { ServiceProvider } from "./context/ServiceContext";
import TripPage from "./page/admin/TripPage";

export function App() {
  return (
    <AuthProvider>
      <ServiceProvider>
        <BrowserRouter>
          <Navbar />
          <main className="container mx-auto px-10">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminMainPage />} />
                <Route path="/trips" element={<TripPage />} />
                <Route path="/client" element={<ClientPage />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </ServiceProvider>
    </AuthProvider>
  );
}
