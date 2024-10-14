import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ListarVagasPorIdDoUsuario } from "../../servicos/inscricoesService";

export default function ListarVagas(props) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [vagasCandidatadas, setVagasCandidatadas] = useState([]);

  function candidatos(vaga) {
    props.setVagaSelecionada(vaga);
    props.listaCandidatos(vaga);
  }

  useEffect(() => {
    if (user && user.candidato) {
      ListarVagasPorIdDoUsuario(user.id).then((resposta) => {
        if (Array.isArray(resposta)) {
          setVagasCandidatadas(resposta.map((vaga) => vaga.vag_id));
        } else {
          console.error("Resposta não é um array:", resposta);
        }
      });
    }
  }, [user]);

  return (
    <div className="lista-vagas-grid">
      {props.vagas ? (
        props.vagas.map((vaga, index) => (
          <Card key={vaga.vag_id}>
            <Card.Body className="d-flex flex-column">
              <div className="h-100 pb-4">
                <Card.Title>Cargo - {vaga.vag_cargo}</Card.Title>
                <Card.Text>{vaga.vag_descricao}</Card.Text>
                {user && user.logado ? (
                  <Card.Subtitle className="mb-2 text-muted">
                    Salário: R${vaga.vag_salario},00
                  </Card.Subtitle>
                ) : (
                  ""
                )}
              </div>
              {user && user.candidato && vagasCandidatadas.includes(vaga.vag_id) ? (
                <Button variant="secondary" disabled>
                  Já se candidatou
                </Button>
              ) : user && user.logado && user.candidato ? (
                <Button
                  variant="success"
                  onClick={() => props.candidatarVaga(vaga)}
                >
                  Se candidatar
                </Button>
              ) : user && user.logado && !user.candidato ? (
                <div className="d-flex flex-row justify-content-center align-items-center gap-2">
                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => candidatos(vaga)}
                  >
                    Candidatos
                  </Button>
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => props.excluirVaga(vaga)}
                  >
                    Excluir
                  </Button>
                </div>
              ) : (
                <Button variant="success" href="/login">
                  Se candidatar
                </Button>
              )}
            </Card.Body>
          </Card>
        ))
      ) : (
        <span>Carregando...</span>
      )}
    </div>
  );
}
