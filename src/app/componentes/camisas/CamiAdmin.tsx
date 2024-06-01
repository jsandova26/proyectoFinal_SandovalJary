import { useState } from "react";
import { Camisas } from "../../modelos/Camisas";
import { ARREGLO_CAMISAS } from "../../mocks/Camisas-mocks";
import { ARREGLO_CAMISA_MARCA } from "../../utilidades/dominios/DomMarca";
import { ARREGLO_CAMISA_COLOR } from "../../utilidades/dominios/DomColor";
import { ARREGLO_CAMISA_TALLA } from "../../utilidades/dominios/DomTalla";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const CamiAdmin = () => {
  const [arrCamisas, setArrCamisas] = useState<Camisas[]>(ARREGLO_CAMISAS);
  const [objCamisa, setObjCamisa] = useState<Camisas>(new Camisas(0, "", "", "", "", ""));
  const [showEliminar, setShowEliminar] = useState<boolean>(false);
  const [showEditar, setShowEditar] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCloseEliminar = () => setShowEliminar(false);
  const handleCloseEditar = () => setShowEditar(false);

  const eliminarCamisa = (codigo: number) => {
    const nuevasCamisas = arrCamisas.filter(camisa => camisa.codCamisa !== codigo);
    setArrCamisas(nuevasCamisas);
    handleCloseEliminar(); // Cerrar el modal después de eliminar
  };

  const editarCamisa = (codigo: number) => {
    navigate(`/camictualizar/${codigo}`);
    handleCloseEditar(); // Cerrar el modal después de editar
  };

  const obtenerNombreMarca = (valor: string) => {
    const marca = ARREGLO_CAMISA_MARCA.find(objMarca => objMarca.codMarca === valor);
    return marca ? marca.nombreMarca : "Marca no encontrada";
  };

  const obtenerNombreColor = (valor: string) => {
    const color = ARREGLO_CAMISA_COLOR.find(objColor => objColor.codColor === valor);
    return color ? color.nombreColor : "Color no encontrado";
  };

  const obtenerNombreTalla = (valor: string) => {
    const talla = ARREGLO_CAMISA_TALLA.find(objTalla => objTalla.codTalla === valor);
    return talla ? talla.nombreTalla : "Talla no encontrada";
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-11 mt-4">
        <table className="table table-striped table-hover">
          <thead>
            <tr className="table-danger">
              <th style={{ width: "10%" }}>Codigo</th>
              <th style={{ width: "30%" }}>Marca</th>
              <th style={{ width: "15%" }}>Color</th>
              <th style={{ width: "25%" }}>Talla</th>
              <th style={{ width: "10%" }}>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {arrCamisas.map((camisa: Camisas) => (
              <tr className="align-middle" key={camisa.codCamisa}>
                <td>{camisa.codCamisa}</td>
                <td>{obtenerNombreMarca(camisa.codMarcaCamisa)}</td>
                <td>{obtenerNombreColor(camisa.colorCamisa)}</td>
                <td>{obtenerNombreTalla(camisa.tallaCamisa)}</td>
                <td className="text-center">
                  <a href="/#" onClick={(e) => { e.preventDefault(); setShowEliminar(true); setObjCamisa(camisa); }}>
                    <i className="fa-solid fa-trash-can rojito"></i>
                  </a>{" "}
                  <a href="/#" onClick={(e) => { e.preventDefault(); setShowEditar(true); setObjCamisa(camisa); }}>
                    <i className="fa-regular fa-pen-to-square verde"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal para eliminar */}
        <Modal show={showEliminar} onHide={handleCloseEliminar} backdrop="static" keyboard={false}>
          <ModalHeader closeButton>
            <ModalTitle>Eliminar Camisa</ModalTitle>
          </ModalHeader>
          <ModalBody>
            ¿Está seguro de eliminar la camisa con código {objCamisa.codCamisa}?
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={handleCloseEliminar}>Cancelar</Button>
            <Button variant="danger" onClick={() => eliminarCamisa(objCamisa.codCamisa)}>Eliminar</Button>
          </ModalFooter>
        </Modal>

        {/* Modal para editar */}
        <Modal show={showEditar} onHide={handleCloseEditar} backdrop="static" keyboard={false}>
          <ModalHeader closeButton>
            <ModalTitle>Editar Camisa</ModalTitle>
          </ModalHeader>
          <ModalBody>
            ¿Está seguro de que desea editar la camisa con código {objCamisa.codCamisa}?
          </ModalBody>
          <ModalFooter>
            <Button variant="secondary" onClick={handleCloseEditar}>Cancelar</Button>
            <Button variant="primary" onClick={() => editarCamisa(objCamisa.codCamisa)}>Editar</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};
