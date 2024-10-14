import { useState } from "react";
import { Table, Form } from "react-bootstrap";
import { FaFilePdf } from "react-icons/fa";

export default function ListaCandidatosNaVaga({ candidatos }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCandidatos = candidatos.filter(candidato =>
    candidato.usu_nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Currículo</th>
          </tr>
        </thead>
        <tbody>
          {filteredCandidatos.length > 0 ? (
            filteredCandidatos.map((candidato, index) => (
              <tr key={index}>
                <td>{candidato.usu_id}</td>
                <td>{candidato.usu_nome}</td>
                <td>{candidato.usu_tel}</td>
                <td>
                  {candidato.usu_curriculo ? (
                    <a
                      href={candidato.usu_curriculo}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Baixar Currículo"
                      style={{ color: 'red' }} 
                    >
                      <FaFilePdf size={24} />
                    </a>
                  ) : (
                    "Nenhum currículo"
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum candidato encontrado</td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
}
