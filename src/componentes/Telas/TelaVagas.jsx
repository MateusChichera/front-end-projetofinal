import { useEffect, useState } from "react";
import { Alert, Button, Modal } from "react-bootstrap";
import Pagina from "../Templates/Pagina";
import ListarVagas from "../Listas/ListarVagas";
import { BuscarVagas, ExcluirVaga } from "../../servicos/vagasService";
import FormVagas from "../Formularios/FormVagas";
import {
  GravarInscricao,
  ListarUsuariosPorIdDaVaga,
} from "../../servicos/inscricoesService";
import ListaCandidatosNaVaga from "../Listas/ListaCandidatosNaVaga";

export default function TelaVagas() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [vagaSelecionada, setVagaSelecionada] = useState({
    vag_id: 0,
    vag_cargo: "",
    vag_descricao: "",
    vag_local: "",
    vag_salario: 0,
  });
  const [vagas, setVagas] = useState([]); // Inicializa como array vazio
  const [candidatos, setCandidatos] = useState([]);

  const [modoCadastro, setModoCadastro] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [modoExclusao, setModoExclusao] = useState(false);
  const [modoCandidatar, setModoCandidatar] = useState(false);
  const [modoListaDeCandidato, setModoListaDeCandidato] = useState(false);

  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Listar vagas
  useEffect(() => {
    BuscarVagas().then((resposta) => {
      setVagas(resposta);
    });
  }, []);

  // Cadastrar vaga
  function cadastrar() {
    setVagaSelecionada({
      vag_id: 0,
      vag_cargo: "",
      vag_descricao: "",
      vag_local: "",
      vag_salario: 0,
    });
    handleShow();
    setModoCadastro(true);
  }

  // Editar vaga
  function editar(vaga) {
    setModoEdicao(true);
    setVagaSelecionada(vaga);
    handleShow();
  }

  // Lista candidatos
  function listaCandidatos(vaga) {
    setModoListaDeCandidato(true);
    setVagaSelecionada(vaga);
    handleShow();

    ListarUsuariosPorIdDaVaga(vaga.vag_id)
      .then((resposta) => {
        setCandidatos(resposta);
      })
      .catch((erro) => {
        console.log("Erro ao listar candidatos:", erro);
        setCandidatos([]);
      });
  }

  // Excluir vaga
  function desejaExcluir(vaga) {
    setVagaSelecionada(vaga);
    handleShow();
    setModoExclusao(true);
  }

  function excluir() {
    ExcluirVaga(vagaSelecionada.vag_id)
      .then(() => {
        setVagas((prev) => prev.filter((vaga) => vaga.vag_id !== vagaSelecionada.vag_id)); // Remove a vaga da lista
        handleClose();
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  }

  // Candidatar-se
  function desejaCandidatar(vaga) {
    setVagaSelecionada(vaga);
    handleShow();
    setModoCandidatar(true);
  }

  function candidatar() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, "0");
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
    const ano = dataAtual.getFullYear();

    const dataGavar = {
      usu_id: user.id,
      vag_id: vagaSelecionada.vag_id,
      data_inscricao: `${ano}-${mes}-${dia}`, // Formato mais padrão
    };

    GravarInscricao(dataGavar)
      .then((resposta) => {
        if (resposta.message === "Inscrição realizada com sucesso.") {
          setAlert({
            status: "success",
            message: `Inscrição para vaga de ${vagaSelecionada.vag_cargo} realizada com sucesso!`,
          });
          handleClose();
        } else {
          setAlert({ status: "danger", message: "Erro ao cadastrar inscrição." });
        }
      })
      .catch((erro) => {
        console.error("Erro ao gravar inscrição:", erro);
        setAlert({ status: "danger", message: "Erro ao gravar inscrição." });
      });
  }

  function closeModal() {
    handleClose();
    setModoCadastro(false);
    setModoEdicao(false);
    setModoExclusao(false);
    setModoCandidatar(false);
    setModoListaDeCandidato(false);
    setAlert({ status: "", message: "" }); // Reseta o alerta ao fechar o modal
  }

  return (
    <>
      <Pagina className="d-flex flex-column gap-5">
        <div className="d-flex flex-row justify-content-between align-items-start">
          <h1>Vagas</h1>

          {user.candidato ? null : (
            <Button variant="success" onClick={cadastrar}>
              Cadastrar nova vaga
            </Button>
          )}
        </div>
        {alert.status && (
          <Alert key="alert-login" variant={alert.status} className="w-100">
            {alert.message}
          </Alert>
        )}
        <ListarVagas
          vagas={vagas}
          setVagaSelecionada={editar}
          excluirVaga={desejaExcluir}
          candidatarVaga={desejaCandidatar}
          listaCandidatos={listaCandidatos}
        />
      </Pagina>

      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modoCandidatar && "Se candidatar"}
            {modoExclusao && "Deseja excluir vaga?"}
            {modoEdicao ? "" : "Cadastrar vaga"}
            {modoListaDeCandidato && "Lista de Candidatos"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modoExclusao ? (
            <div className="d-flex flex-column gap-3">
              <p>
                Deseja realmente excluir a vaga: {vagaSelecionada.vag_cargo}?
              </p>
              <Button variant="danger" onClick={excluir}>
                Excluir
              </Button>
            </div>
          ) : modoCandidatar ? (
            <div className="d-flex flex-column gap-3">
              <div className="d-flex flex-column gap-2">
                <span>
                  <b>Cargo:</b> {vagaSelecionada.vag_cargo}
                </span>
                <span>
                  <b>Descrição:</b> {vagaSelecionada.vag_descricao}
                </span>
                <span>
                  <b>Salário:</b> {vagaSelecionada.vag_salario}
                </span>
                <span>
                  <b>Local:</b> {vagaSelecionada.vag_local}
                </span>
              </div>
              <Button variant="success" onClick={candidatar}>
                Candidatar-se
              </Button>
            </div>
          ) : modoCadastro ? (
            <FormVagas
              setModoEdicao={setModoEdicao}
              modoEdicao={modoEdicao}
              vagaSelecionada={vagaSelecionada}
            />
          ) : modoListaDeCandidato ? (
            <ListaCandidatosNaVaga candidatos={candidatos} />
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}
