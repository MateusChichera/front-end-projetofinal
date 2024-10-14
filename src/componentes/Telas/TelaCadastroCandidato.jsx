import FormCadastroCandidato from "../Formularios/FormCadastroCandidato";
import Rodape from "../Templates/Rodape";

export default function TelaCadastroCandidato() {
  return (
    <>
      <main className="pt-5">
        <FormCadastroCandidato />
      </main>
      <Rodape />
    </>
  );
}
