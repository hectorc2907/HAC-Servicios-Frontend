import { Routes, Route } from "react-router-dom";
import { Admin } from "../page/admin/Admin";
import { Client } from "../page/admin/Client";
import { Loads } from "../page/admin/Loads";

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Admin />} />
      <Route exact path="/client" element={<Client />} />
      <Route exact path="/loads" element={<Loads />} />
    </Routes>
  );
};
