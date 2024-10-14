import Rodape from "../Templates/Rodape";
import FormLogin from "../Formularios/FormLogin";

export default function TelaLogin() {
  return (
    <>
      <main className="pt-5">
        <FormLogin />
      </main>
      <Rodape />
    </>
  );
}
