import { useContext, useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { login } from "../../servicos/usuariosService";
import { ContextoUsuarioLogado } from "../../App";
import { useNavigate } from "react-router-dom";

export default function FormLogin() {
  const contexto = useContext(ContextoUsuarioLogado);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cpf: "",
    senha: "",
  });
  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });

  function handleSubmit(data) {
    data.preventDefault();
    login(formData.cpf, formData.senha)
      .then((resposta) => {
        if (resposta.message !== "Credenciais inválidas") {
          setAlert({ status: "success", message: resposta.message });
          contexto.setUsuarioLogado({
            id: resposta.id,
            nome: resposta.nome,
            logado: true,
            token: resposta.token,
            candidato: resposta.id === 1 ? false : true,
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: resposta.id,
              nome: resposta.nome,
              logado: true,
              token: resposta.token,
              candidato: resposta.id === 1 ? false : true,
            })
          );
          navigate("/vagas");
        } else {
          setAlert({ status: "danger", message: resposta.message });
        }
      })
      .catch((erro) => {
        console.log(erro.message);
        setAlert({ status: "danger", message: erro.message });
      });
  }

  const handleChange = (data) => {
    const { name, value } = data.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  return (
    <div className="login-container px-4 d-flex justify-content-center align-items-center">
      <div className="login-card w-100 p-4 border rounded">
        <Container>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="cpf">CPF</Form.Label>
              <Form.Control
                type="text"
                id="cpf"
                name="cpf"
                onChange={handleChange}
                value={formData.cpf}
                placeholder="Informe o CPF para login"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="senha">Senha</Form.Label>
              <Form.Control
                type="password"
                id="senha"
                name="senha"
                onChange={handleChange}
                value={formData.senha}
                placeholder="Informe sua senha de acesso"
              />
            </Form.Group>
            {alert.status != "" ? (
              <Alert key="alert-login" variant={alert.status} className="w-100">
                {alert.message}
              </Alert>
            ) : null}
            <div className="w-100 d-flex flex-row justify-content-end align-items-center gap-3">
              <Button href="/cadastro" variant="link">
                Cadastrar
              </Button>
              <Button variant="success" type="submit">
                Entrar
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </div>
  );
}
