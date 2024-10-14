import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { GravarVaga } from "../../servicos/vagasService";

export default function FormVagas(props) {
  const [formVaga, setFormVaga] = useState(props.vagaSelecionada);
  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  function handleSubmit(data) {
    data.preventDefault();

    if (!props.modoEdicao) {
      const { vag_id, ...vagaGravar } = formVaga;

      GravarVaga(vagaGravar)
        .then((resposta) => {
          setAlert({
            status: "success",
            message: "Vaga cadastrada com sucesso!",
            
          });
          window.location.reload();
          setFormVaga({
            vag_id: 0,
            vag_cargo: "",
            vag_descricao: "",
            vag_local: "",
            vag_salario: 0,
          });
        })
        .catch((erro) => {
          console.log(erro.message);
          setAlert({ status: "danger", message: erro.message });
        });
    } else {
      console.log("Caiu no else");
      setAlert({
        status: "warning",
        message: "Funcionalidade de edição não implementada ainda",
      });
    }
  }

  const handleChange = (data) => {
    const { name, value } = data.target;

    setFormVaga((prevFormData) => ({
      ...prevFormData,
      [name]: name === "vag_salario" ? Number(value) : value, // Converte vag_salario para número
    }));
  };
  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex flex-column justify-content-start align-items-center gap-3"
    >
      {props.modoEdicao ? (
        <Alert variant="light" className="w-100">
          ID: {props.vagaSelecionada.vag_id}
        </Alert>
      ) : (
        ""
      )}
      <Form.Group className="w-100">
        <Form.Label>Cargo da Vaga</Form.Label>
        <Form.Control
          type="text"
          id="vag_cargo"
          name="vag_cargo"
          onChange={handleChange}
          value={formVaga.vag_cargo}
          placeholder="Ex: Desenvolvedor Front-End"
        />
      </Form.Group>
      <Form.Group className="w-100">
        <Form.Label>Descrição da Vaga</Form.Label>
        <Form.Control
          type="text"
          id="vag_descricao"
          name="vag_descricao"
          onChange={handleChange}
          value={formVaga.vag_descricao}
          placeholder="Ex: Responsável pelo desenvolvimento e manutenção de aplicações web"
        />
      </Form.Group>
      <Form.Group className="w-100">
        <Form.Label>Local</Form.Label>
        <Form.Control
          type="text"
          id="vag_local"
          name="vag_local"
          onChange={handleChange}
          value={formVaga.vag_local}
          placeholder="Ex: São Paulo-SP"
        />
      </Form.Group>
      <Form.Group className="w-100">
        <Form.Label>Salário</Form.Label>
        <Form.Control
          type="number"
          id="vag_salario"
          name="vag_salario"
          onChange={handleChange}
          value={formVaga.vag_salario}
          placeholder="Ex: 5000,00"
        />
      </Form.Group>

      {alert.status != "" ? (
        <Alert key="alert-vagas" variant={alert.status} className="w-100">
          {alert.message}
        </Alert>
      ) : null}

      <Button variant="success" type="submit" className="w-100">
        Cadastrar
      </Button>
    </Form>
  );
}
