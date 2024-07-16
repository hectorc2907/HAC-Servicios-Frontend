import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./page/HomePage";
import RegisterPage from "./page/RegisterPage";
import LoginPage from "./page/LoginPage";
import AdminMainPage from "./page/admin/AdminMainPage";
import ProtectedRoute from "./components/ProtectedRoutes";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto px-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminMainPage />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
