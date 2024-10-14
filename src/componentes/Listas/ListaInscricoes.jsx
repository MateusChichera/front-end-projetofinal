import { Table } from "react-bootstrap";

export default function ListaIncricoes(props) {
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Id</th>
          <th>Cargo</th>
          <th>Local</th>
          <th>Salário</th>
        </tr>
      </thead>
      <tbody>
        {props.inscricoes && props.inscricoes.length > 0 ? (
          props.inscricoes.map((vaga) => (
            <tr key={vaga.vag_id}>
              <td>{vaga.vag_id}</td>
              <td>{vaga.vag_cargo}</td>
              <td>{vaga.vag_local}</td>
              <td>R${vaga.vag_salario},00</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">Carregando...</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
