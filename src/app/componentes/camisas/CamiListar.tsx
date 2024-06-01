import { useState } from "react";
import { Camisas } from "../../modelos/Camisas"; 
import { ARREGLO_CAMISAS } from "../../mocks/Camisas-mocks";
import { ARREGLO_CAMISA_MARCA } from "../../utilidades/dominios/DomMarca";
import { ARREGLO_CAMISA_COLOR } from "../../utilidades/dominios/DomColor";
import { ARREGLO_CAMISA_TALLA } from "../../utilidades/dominios/DomTalla";

export const CamiListado = () => { 
  const [arrCamisas] = useState<Camisas[]>(ARREGLO_CAMISAS); 
  const [arrMarcas] = useState(ARREGLO_CAMISA_MARCA); // Arreglo de marcas
  const [arrColores] = useState(ARREGLO_CAMISA_COLOR); // Arreglo de colores
  const [arrTallas] = useState(ARREGLO_CAMISA_TALLA); // Arreglo de tallas

  const obtenerNombreMarca = (valor: string) => {
    for (const objMarca of arrMarcas) { 
      if (objMarca.codMarca === valor) {
        return objMarca.nombreMarca;
      }
    }
    return ""; // Si no se encuentra la marca, devuelve una cadena vacía
  };

  const obtenerNombreColor = (valor: string) => {
    const color = arrColores.find((objColor) => objColor.codColor === valor);
    return color ? color.nombreColor : "BLANCO";
  };

  const obtenerNombreTalla = (valor: string) => {
    const talla = arrTallas.find((objTalla) => objTalla.codTalla === valor);
    return talla ? talla.nombreTalla : "M";
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <div className="col-md-11 mt-4">
          <table className="table table-striped table-hover">
            <thead>
              <tr className="table-danger">
                <th style={{ width: "10%" }}>Nro</th>
                <th style={{ width: "30%" }}>Marca</th>
                <th style={{ width: "20%" }}>Color</th>
                <th style={{ width: "30%" }}>Talla</th>
                <th style={{ width: "10%" }}>Opciones</th>
              </tr>
            </thead>
            <tbody>
              {arrCamisas.map((miCami: Camisas) => (
                <tr className="align-middle" key={miCami.codCamisa}>
                  <td>{miCami.codCamisa}</td>
                  <td>{obtenerNombreMarca(miCami.codMarcaCamisa)}</td>
                  <td>{obtenerNombreColor(miCami.colorCamisa)}</td>
                  <td>{obtenerNombreTalla(miCami.tallaCamisa)}</td>
                  <td>
                    <img
                      src={miCami.imagenCamisaBase64}
                      alt=""
                      className="imagenListado"
                    />
                    <div className="text-info">{miCami.imagenCamisa}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
