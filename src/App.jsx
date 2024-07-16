import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./page/HomePage";
import RegisterPage from "./page/RegisterPage";

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <main className="container mx-auto px-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}
