import Pagina from "../Templates/Pagina";
import ListarVagas from "../Listas/ListarVagas";
import { useEffect, useState } from "react";
import { BuscarVagas } from "../../servicos/vagasService";

export default function TelaInicial() {
  const [vagas, setVagas] = useState();

  useEffect(() => {
    BuscarVagas().then((resposta) => {
      setVagas(resposta);
    });
  }, []);

  return (
    <Pagina className="d-flex flex-column gap-5">
      <h1>Bem vindo ao sistema</h1>
      <ListarVagas vagas={vagas} />
    </Pagina>
  );
}
