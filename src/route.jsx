import { Routes, Route } from "react-router-dom";
import { PaginaInformativa } from "./pages/homeInformativo";
import { Sign } from "./pages/sign";

export function Rutas() {
    return (
        <Routes>
        <Route path="/Sign" element={<Sign />} />
        <Route path="/*" element={<PaginaInformativa />} />
        </Routes>
    );
  }