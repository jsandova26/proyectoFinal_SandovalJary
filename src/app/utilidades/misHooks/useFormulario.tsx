import { useState } from "react";

export const useFormulario = <T extends {}>(objetoInicial: T) => {
  const [objeto, setObjeto] = useState<T>(objetoInicial);

  const dobleEnlace = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setObjeto({ ...objeto, [name]: value });
  };

  return {
    objeto,
    dobleEnlace,
    ...objeto, 
  };
};
