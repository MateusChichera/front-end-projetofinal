import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Menu(props) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [logado, setLogado] = useState("deslogado");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      if (user.candidato) {
        setLogado("candidato");
      } else {
        setLogado("recrutador");
      }
    } else {
      setLogado("deslogado");
    }
  }, [user]);

  function logout() {
    localStorage.clear();
    setUser(null); // Atualiza o estado do usuário
    navigate("/");
    window.location.reload();
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#" as={Link} to="/">
          Menu -{" "}
          {logado === "candidato"
            ? user.nome
            : logado === "recrutador"
            ? "Recrutador"
            : null}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row justify-content-start align-items-center">
              {logado === "candidato" ? (
                <>
                  <Nav.Link href="/vagas">Vagas</Nav.Link>
                  <Nav.Link href="/inscricoes">Vagas inscritas</Nav.Link>
                </>
              ) : logado === "recrutador" ? (
                <Nav.Link href="/"></Nav.Link>
              ) : null}
            </div>
            {logado === "candidato" || logado === "recrutador" ? (
              <Button variant="secondary" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button variant="primary" href="/login">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
