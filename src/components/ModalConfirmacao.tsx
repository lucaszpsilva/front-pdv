interface ModalConfirmacaoProps {
  isOpen: boolean;
  titulo: string;
  mensagem: string;
  onConfirmar: () => void;
  onCancelar: () => void;
  confirmarTexto?: string;
  cancelarTexto?: string;
  tipo?: "perigo" | "normal";
}

export function ModalConfirmacao({
  isOpen,
  titulo,
  mensagem,
  onConfirmar,
  onCancelar,
  confirmarTexto = "Confirmar",
  cancelarTexto = "Cancelar",
  tipo = "normal",
}: ModalConfirmacaoProps) {
  if (!isOpen) return null;

  const corConfirmar =
    tipo === "perigo"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-emerald-500 hover:bg-emerald-600";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 p-6 flex flex-col gap-4">
        <h3 className="text-lg font-bold text-gray-800 text-center">
          {titulo}
        </h3>
        <p className="text-sm text-gray-500 text-center">{mensagem}</p>
        <div className="flex justify-center gap-3 mt-2">
          <button
            onClick={onCancelar}
            className="px-6 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer font-medium"
          >
            {cancelarTexto}
          </button>
          <button
            onClick={onConfirmar}
            className={`px-6 py-2 text-white text-sm font-bold rounded-lg shadow-sm cursor-pointer ${corConfirmar}`}
          >
            {confirmarTexto}
          </button>
        </div>
      </div>
    </div>
  );
}