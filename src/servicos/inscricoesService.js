import { baseURL } from "./config";

export async function GravarInscricao(data) {
  const resposta = await fetch(baseURL + "/inscricoes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await resposta.json();
}

export async function ListarVagasPorIdDoUsuario(id) {
  const resposta = await fetch(`${baseURL}/inscricoes/vagas/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await resposta.json();
}

export async function ListarUsuariosPorIdDaVaga(id) {
  const resposta = await fetch(`${baseURL}/inscricoes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await resposta.json();
}
