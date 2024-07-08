import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./page/Home";
import { Login } from "./page/login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AdminRoutes } from "./components/AdminRoutes";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route
          exact
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
