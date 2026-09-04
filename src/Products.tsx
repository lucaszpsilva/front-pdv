import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import { useRelogio } from "./hooks/useRelogio";
import { toast, ToastContainer } from "./components/Toast";
import { ModalConfirmacao } from "./components/ModalConfirmacao";
import { ModalEditarProduto } from "./components/ModalEditarProduto";
import { LeitorProdutos } from "./components/LeitorProdutos";
import { ModalNewProduct } from "./components/ModalNewProduct";
import {
  Produto,
  listarProdutos,
  desativarProduto,
  atualizarProduto,
} from "./services/productService";

export const Products = () => {
  const { dataFormatada, horaFormatada } = useRelogio();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [resultadoPesquisa, setResultadoPesquisa] = useState<Produto[]>([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // Estado para modal de confirmação de exclusão
  const [confirmacaoAberta, setConfirmacaoAberta] = useState(false);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<number | null>(
    null,
  );

  // Estado para modal de edição
  const [editarAberto, setEditarAberto] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState<Produto | null>(
    null,
  );

  const navigate = useNavigate();

  // Função central para buscar dados reais do SQLite
  const carregarProdutosDoBanco = async () => {
    try {
      setCarregando(true);
      const lista = await listarProdutos();
      setProdutos(lista);
      setResultadoPesquisa(lista);
    } catch (error) {
      console.error("Erro ao carregar dados do SQLite:", error);
      toast("erro", "Erro ao carregar produtos do banco de dados!");
    } finally {
      setCarregando(false);
    }
  };

  // Carrega ao abrir a tela
  useEffect(() => {
    carregarProdutosDoBanco();
  }, []);

  const handlePesquisar = (termoBusca: string) => {
    if (!termoBusca.trim()) {
      setResultadoPesquisa(produtos);
      return;
    }

    const filtrados = produtos.filter(
      (p) =>
        p.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        p.ean.includes(termoBusca),
    );

    if (filtrados.length === 0) {
      toast("info", "Nenhum produto encontrado!");
      return;
    }

    setResultadoPesquisa(filtrados);
  };

  const handleEditar = (produto: Produto) => {
    setProdutoParaEditar(produto);
    setEditarAberto(true);
  };

  const handleSalvarEdicao = async (produto: Produto) => {
    await atualizarProduto(produto);
    toast("sucesso", `Produto "${produto.nome}" atualizado com sucesso!`);
    await carregarProdutosDoBanco();
  };

  const confirmarExclusao = (id?: number) => {
    if (!id) return;
    setProdutoParaExcluir(id);
    setConfirmacaoAberta(true);
  };

  const handleDeletar = async () => {
    if (!produtoParaExcluir) return;

    try {
      await desativarProduto(produtoParaExcluir);
      toast("sucesso", "Produto excluído com sucesso!");
      await carregarProdutosDoBanco();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      toast("erro", "Erro ao excluir produto!");
    } finally {
      setConfirmacaoAberta(false);
      setProdutoParaExcluir(null);
    }
  };

  return (
    <main className="w-screen h-screen bg-gray-50 flex flex-col justify-between p-6 select-none overflow-hidden">
      <ToastContainer />

      {/* Header Superior */}
      <header className="h-12 flex border-b border-gray-300 bg-white items-center px-4 shrink-0 rounded-xl">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/")}
            className="border-r border-gray-300 pr-4 cursor-pointer text-gray-600 hover:text-gray-900 font-medium"
          >
            ← Início
          </button>
          <h2 className="ml-6 text-gray-500">
            Produtos Cadastrados:{" "}
            <span className="text-gray-900 font-bold">
              #{produtos.length.toString().padStart(4, "0")}
            </span>
          </h2>
        </div>

        <div className="flex ml-auto">
          <button
            onClick={() => setModalAberto(true)}
            className="w-30 pb-1 text-center border rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 cursor-pointer"
          >
            <span className="font-bold text-xs">+ Novo Produto</span>
          </button>
        </div>

        <div className="flex items-center ml-auto gap-4">
          <span className="text-gray-500">{dataFormatada}</span>
          <span className="text-sm font-semibold">{horaFormatada}</span>
          <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-emerald-600 font-semibold text-xs">
              Sistema Online
            </span>
          </div>
        </div>
      </header>

      {/* Barra de Pesquisa */}
      <section className="my-4">
        <LeitorProdutos onPesquisar={handlePesquisar} />
      </section>

      {/* Grid / Tabela de Itens */}
      <section className="flex-1 bg-white rounded-xl border border-gray-200 p-4 overflow-y-auto">
        {carregando ? (
          <div className="text-center py-10 text-gray-400">
            Carregando catálogo...
          </div>
        ) : resultadoPesquisa.length === 0 ? (
          <div className="text-center py-10 text-gray-400">
            Nenhum produto cadastrado no banco.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase">
                <th className="py-3 px-4">Código</th>
                <th className="py-3 px-4">Descrição</th>
                <th className="py-3 px-4">Preço</th>
                <th className="py-3 px-4">Estoque</th>
                <th className="py-3 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {resultadoPesquisa.map((prod) => (
                <tr
                  key={prod.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-4 font-mono text-sm text-gray-500">
                    {prod.ean}
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-800">
                    {prod.nome}
                  </td>
                  <td className="py-3 px-4 text-emerald-600 font-bold">
                    R$ {prod.preco_venda.toFixed(2).replace(".", ",")}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {prod.estoque} {prod.tipo || "un"}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleEditar(prod)}
                        title="Editar Produto"
                        className="p-1.5 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => confirmarExclusao(prod.id)}
                        title="Excluir Produto"
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Modal de Novo Produto */}
      <ModalNewProduct
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSalvar={carregarProdutosDoBanco}
      />

      {/* Modal de Edição */}
      <ModalEditarProduto
        isOpen={editarAberto}
        produto={produtoParaEditar}
        onClose={() => {
          setEditarAberto(false);
          setProdutoParaEditar(null);
        }}
        onSalvar={handleSalvarEdicao}
      />

      {/* Modal de Confirmação de Exclusão */}
      <ModalConfirmacao
        isOpen={confirmacaoAberta}
        titulo="Excluir Produto"
        mensagem="Deseja realmente excluir este produto? Esta ação não pode ser desfeita."
        confirmarTexto="Sim, Excluir"
        cancelarTexto="Cancelar"
        tipo="perigo"
        onConfirmar={handleDeletar}
        onCancelar={() => {
          setConfirmacaoAberta(false);
          setProdutoParaExcluir(null);
        }}
      />
    </main>
  );
};