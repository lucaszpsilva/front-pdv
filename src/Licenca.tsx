import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "./components/Toast";

export const Licenca = () => {
  const [chave, setChave] = useState("");
  const navigate = useNavigate();
  const licencaCorreta = "XXXX-XXXX-XXXX-XXXX";

  const handleAtivar = () => {
    console.log("Ativando chave:", chave);
    // Lógica de ativação aqui
    if (chave === licencaCorreta) {
      localStorage.setItem("@frontpdv:licenca", chave);
      navigate("/login");
      return;
    } else {
      toast("erro", "Licença incorreta, por favor digite novamente.");
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-50 flex items-center justify-center">
      <ToastContainer />
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Ativação de Licença
        </h1>
        <p className="text-sm text-gray-500 mb-4">
          Insira a chave para liberar o sistema.
        </p>

        <input
          type="text"
          value={chave}
          onChange={(e) => setChave(e.target.value)}
          className="w-full h-10 border rounded-lg px-3 mb-4"
          placeholder="XXXX-XXXX-XXXX-XXXX"
        />

        <button
          onClick={handleAtivar}
          className="w-full h-10 bg-emerald-500 text-white font-bold rounded-lg"
        >
          Ativar
        </button>
      </div>
    </div>
  );
};
