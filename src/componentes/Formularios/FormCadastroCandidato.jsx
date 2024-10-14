import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { cadastro } from "../../servicos/usuariosService";

export default function FormCadastroCandidato() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usu_nome: "",
    usu_cpf: "",
    usu_nascimento: "",
    usu_senha: "",
    usu_tel: "",
    usu_curriculo: null,
  });
  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  function handleSubmit(data) {
    data.preventDefault();

    cadastro(formData)
      .then((resposta) => {
        console.log("Resposta - ", resposta);
        if (resposta.message === "Usuário cadastrado com sucesso") {
          setAlert({ status: "success", message: resposta.message });
          navigate("/login");
        } else {
          setAlert({ status: "danger", message: "Erro ao cadastrar usuário" });
          console.log(resposta);
        }
      })
      .catch((erro) => {
        console.log(erro.message);
        setAlert({ status: "danger", message: erro.message });
      });
  }

  const handleChange = (data) => {
    const { name, value, files } = data.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: name === "usu_curriculo" ? files[0] : value,
    }));
  };
  return (
    <div className="login-container px-4 d-flex justify-content-center align-items-center">
      <div className="login-card w-100 p-4 border rounded">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                type="text"
                id="usu_nome"
                name="usu_nome"
                onChange={handleChange}
                value={formData.usu_nome}
                placeholder="Digite o seu nome"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>CPF</Form.Label>
              <Form.Control
                type="text"
                id="usu_cpf"
                name="usu_cpf"
                onChange={handleChange}
                value={formData.usu_cpf}
                placeholder="Digite o seu CPF"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control
                type="date"
                id="usu_nascimento"
                name="usu_nascimento"
                onChange={handleChange}
                value={formData.usu_nascimento}
                placeholder="Digite a data do seu nascimento"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Telefone</Form.Label>
              <Form.Control
                type="text"
                id="usu_tel"
                name="usu_tel"
                onChange={handleChange}
                value={formData.usu_tel}
                placeholder="Digite o seu telefone"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                type="password"
                id="usu_senha"
                name="usu_senha"
                onChange={handleChange}
                value={formData.usu_senha}
                placeholder="Crie sua senha"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Curriculo</Form.Label>
              <Form.Control
                type="file"
                id="usu_curriculo"
                name="usu_curriculo"
                onChange={handleChange}
                required
              />
            </Form.Group>
            {alert.status != "" ? (
              <Alert key="alert-login" variant={alert.status} className="w-100">
                {alert.message}
              </Alert>
            ) : null}
            <div className="w-100 d-flex flex-row justify-content-end align-items-center gap-3">
              <Button href="/login" variant="link">
                Login
              </Button>
              <Button variant="success" type="submit">
                Cadastrar
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}
