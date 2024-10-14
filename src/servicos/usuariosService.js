import { baseURL } from "./config";

export async function login(cpf, senha) {
  const resposta = await fetch(baseURL + "/usuario/login", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpf, senha }),
  });
  return await resposta.json();
}

export async function cadastro(formData) {
  const formDataToSend = new FormData(); // Cria um objeto FormData

  // Adiciona os campos ao FormData
  formDataToSend.append("usu_nome", formData.usu_nome);
  formDataToSend.append("usu_cpf", formData.usu_cpf);
  formDataToSend.append("usu_nascimento", formData.usu_nascimento);
  formDataToSend.append("usu_senha", formData.usu_senha);
  formDataToSend.append("usu_tel", formData.usu_tel);
  formDataToSend.append("usu_curriculo", formData.usu_curriculo); // Arquivo

  // Envia a requisição
  const resposta = await fetch(baseURL + "/usuario", {
    method: "POST",
    body: formDataToSend, // Envia o FormData como corpo
  });

  return await resposta.json();
}
