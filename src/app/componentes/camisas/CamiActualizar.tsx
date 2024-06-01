import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import noFoto from "../../../assets/img/noDisponible.png";
import { CamisasMarca } from "../../modelos/CamisasMarca";
import { ARREGLO_CAMISA_MARCA } from "../../utilidades/dominios/DomMarca";
import { useFormulario } from "../../utilidades/misHooks/useFormulario";
import { Camisas } from "../../modelos/Camisas";
import { ARREGLO_CAMISAS } from "../../mocks/Camisas-mocks";
import { ConvertirBase64 } from "../../utilidades/funciones/ConvertirBase64";
import { CamisasTalla } from "../../modelos/CamisasTalla";
import { ARREGLO_CAMISA_TALLA } from "../../utilidades/dominios/DomTalla";
import { CamisasColor } from "../../modelos/CamisasColor";
import { ARREGLO_CAMISA_COLOR } from "../../utilidades/dominios/DomColor";

export const CamiActualizar = () => {
  const [enProceso, setEnProceso] = useState<boolean>(false);
  const [imgBase64, setImgBase64] = useState<any>();
  const [imgMiniatura, setimgMiniatura] = useState<any>(noFoto);

  const [arrCamisas] = useState<Camisas[]>(ARREGLO_CAMISAS);
  const [arrMarcas] = useState<CamisasMarca[]>(ARREGLO_CAMISA_MARCA);
  const [arrTallas] = useState<CamisasTalla[]>(ARREGLO_CAMISA_TALLA);
  const [arrColores] = useState<CamisasColor[]>(ARREGLO_CAMISA_COLOR);

  const {
    objeto: { colorCamisa, tallaCamisa, codMarcaCamisa, imagenCamisa },
    dobleEnlace,
    objeto,
  } = useFormulario<Camisas>(new Camisas(0, "", "", "", "", ""));

  const cargarImagen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivos = e.target.files;
    if (archivos) {
      const imagen = archivos[0];
      setimgMiniatura(URL.createObjectURL(imagen));
      dobleEnlace(e);
      const base64 = await ConvertirBase64(imagen);
      setImgBase64(base64);
    }
  };

  const enviarForm = (objForm: React.FormEvent<HTMLFormElement>) => {
    objForm.preventDefault();
    const formulario = objForm.currentTarget;

    if (formulario.checkValidity() === false) {
      objForm.stopPropagation();
      setEnProceso(true);
    } else {
      // Aquí puedes agregar la lógica para actualizar la camisa
      setEnProceso(false);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="col-md-5 mt-5 pb-4">
        <Form noValidate validated={enProceso} onSubmit={enviarForm}>
          <div className="card">
            <div className="card-header">
              <h5 className="rojito">Actualizar Camisa</h5>
            </div>

            <div className="card-body">
    
              <div className="mb-3">
                <Form.Group controlId="color">
                  <Form.Label>
                    <span className="rojito">*</span> Color
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    required
                    name="colorCamisa"
                    value={colorCamisa}
                    onChange={dobleEnlace}
                  >
                    <option value="">Seleccione un color...</option>
                    {arrColores.map((miColor: CamisasColor) => (
                      <option value={miColor.codColor} key={miColor.codColor}>
                        {miColor.nombreColor}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="talla">
                  <Form.Label>
                    <span className="rojito">*</span> Talla
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    required
                    name="tallaCamisa"
                    value={tallaCamisa}
                    onChange={dobleEnlace}
                  >
                    <option value="">Seleccione una talla...</option>
                    {arrTallas.map((miTalla: CamisasTalla) => (
                      <option value={miTalla.codTalla} key={miTalla.codTalla}>
                        {miTalla.nombreTalla}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="marca">
                  <Form.Label>
                    <span className="rojito">*</span> Marca 
                  </Form.Label>
                  <Form.Select
                    size="sm"
                    required
                    name="codMarcaCamisa"
                    value={codMarcaCamisa}
                    onChange={dobleEnlace}
                  >
                    <option value="">Seleccione una marca...</option>
                    {arrMarcas.map((miMarca: CamisasMarca) => (
                      <option value={miMarca.codMarca} key={miMarca.codMarca}>
                        {miMarca.nombreMarca}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="mb-3">
                <Form.Group controlId="imagen">
                  <Form.Label>
                    <span className="rojito">*</span> Imágen:
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    accept="image/png, image/jpeg"
                    type="file"
                    name="imagenCamisa"
                    onChange={cargarImagen}
                  />
                </Form.Group>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-center">
                  <img
                    src={imgMiniatura}
                    alt="no foto"
                    className="maximoTamanoCreacion"
                  />
                </div>
              </div>
            </div>

            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Actualizar Camisa
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};
