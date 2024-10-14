import { useEffect, useState } from "react";
import Pagina from "../Templates/Pagina";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListaIncricoes from "../Listas/ListaInscricoes";
import { ListarVagasPorIdDoUsuario } from "../../servicos/inscricoesService";

export default function TelaInscricoes() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [inscricoes, setInscricoes] = useState();

  const [usuVaga, setUsuVaga] = useState();

  function onSubmit(data) {
    data.preventDefault();
    console.log("Buscar por - ", usuVaga);
  }

  useEffect(() => {
    if (user && user.candidato) {
      ListarVagasPorIdDoUsuario(user.id).then((resposta) => {
        setInscricoes(resposta);
        console.log(resposta);
        console.log(inscricoes);
      });
    }
  }, []);

  return (
    <>
      <Pagina className="d-flex flex-column gap-5">
        <div className="d-flex flex-row justify-content-between align-items-start">
          <h1>Inscrições</h1>
        </div>
        {user && user.candidato ? null : (
          <div>
            <Form
              onSubmit={onSubmit}
              className="w-100 d-flex flex-row justify-content-center align-items-end gap-2"
            >
              <Form.Group className="w-100" controlId="formBasicEmail">
                <Form.Label>Busque por nome de candidato</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o nome do candidato"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Buscar
              </Button>
            </Form>
          </div>
        )}
        <div>
          <ListaIncricoes inscricoes={inscricoes} />
        </div>
      </Pagina>
    </>
  );
}
