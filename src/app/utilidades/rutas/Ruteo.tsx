import { Route, Routes } from "react-router-dom";

import { AcercaDe } from "../../componentes/otros/Acerca";
import { Inicio } from "../../componentes/contenedor/Inicio";
import { CamiCrear } from "../../componentes/camisas/CamiCrear";
import { CamiAdmin } from "../../componentes/camisas/CamiAdmin";
import { CamiListado } from "../../componentes/camisas/CamiListar";
import { CamiActualizar } from "../../componentes/camisas/CamiActualizar";
import { NoEncontrado } from "../../componentes/contenedor/NoEncontrado";

export const Ruteo = () => {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/camcrear" element={<CamiCrear />} />
      <Route path="/camadmin" element={<CamiAdmin />} />
      <Route path="/camlistar" element={<CamiListado />} />
      <Route path="/camictualizar/:codigo" element={<CamiActualizar />} />
      <Route path="/acerca" element={<AcercaDe />} />
      <Route path="*" element={<NoEncontrado />} />
    </Routes>
  );
};
