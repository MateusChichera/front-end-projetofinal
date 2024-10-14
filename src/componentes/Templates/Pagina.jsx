import Menu from "./Menu";
import { Container } from "react-bootstrap";
import Rodape from "./Rodape";

export default function Pagina(props) {
  return (
    <>
      <Menu />
      <Container>
        <main className={props.className}>{props.children}</main>
      </Container>
      <Rodape />
    </>
  );
}
