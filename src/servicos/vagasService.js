import { baseURL } from "./config";

export async function BuscarVagas() {
  const resposta = await fetch(baseURL + "/vagas", {
    method: "GET",
  });
  return await resposta.json();
}

export async function GravarVaga(data) {
  const resposta = await fetch(baseURL + "/vagas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await resposta.json();
}

export async function ExcluirVaga(id) {
  const resposta = await fetch(`${baseURL}/vagas/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await resposta.json();
}
