import TelaInicial from "./componentes/Telas/TelaInicial";
import Tela404 from "./componentes/Telas/Tela404";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext, useEffect } from "react";
import TelaVagas from "./componentes/Telas/TelaVagas";
import TelaCadastroCandidato from "./componentes/Telas/TelaCadastroCandidato";
import TelaInscricoes from "./componentes/Telas/TelaInscricoes";
import TelaLogin from "./componentes/Telas/TelaLogin";
import "./styles/main.css";

export const ContextoUsuarioLogado = createContext(null);

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState({
    id: 0,
    nome: "",
    logado: false,
    token: "",
    candidato: true,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);

      setUsuarioLogado({
        id: userData.id || "",
        nome: userData.nome || "",
        logado: userData.logado || "",
        token: userData.token || "",
        candidato: userData.candidato || "",
      });
    }
  }, []);

  return !usuarioLogado.logado ? (
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TelaInicial />} />
          <Route path="*" element={<Tela404 />} />
          <Route path="/login" element={<TelaLogin />} />
          <Route path="/cadastro" element={<TelaCadastroCandidato />} />
        </Routes>
      </BrowserRouter>
    </ContextoUsuarioLogado.Provider>
  ) : (
    <div className="App">
      <ContextoUsuarioLogado.Provider
        value={{ usuarioLogado, setUsuarioLogado }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<Tela404 />} />
            <Route path="/" element={<TelaVagas />} />
            <Route path="/login" element={<TelaVagas />} />
            <Route path="/cadastro" element={<TelaVagas />} />
            <Route path="/vagas" element={<TelaVagas />} />
            <Route path="/cadastro" element={<TelaCadastroCandidato />} />
            <Route path="/inscricoes" element={<TelaInscricoes />} />
          </Routes>
        </BrowserRouter>
      </ContextoUsuarioLogado.Provider>
    </div>
  );
}

export default App;
