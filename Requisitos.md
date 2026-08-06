    ## ENGENHARIA DE REQUISITOS

# Visão geral do PRODUTO

- O **FRONT PDV** é um sistema integrado de Ponto de Venda e Gestão de Produtos focado em Pequenas e Médias Empresas (PMEs). O software centraliza as operações diárias da frente de caixa e o controle de catálogo em uma única plataforma simples e ágil, reduzindo o tempo de atendimento e simplificando a administração da loja.

    ## Requisitos FUNCIONAIS

    **RF01 - Autenticação de Usuário:** O sistema deve permitir que Administradores/Operadores façam login para acessar a funcionalidade do Sistema
    **RF02 - Busca de Produtos no Caixa:** O sistema deve permitir a consulta rápida de produtos por Código de barras ou por nome dentro do módulo de vendas
    **RF03 - Gestão de Produtos (Aba Produtos):** O sistema deve permitir o cadastro, edição e consulta de produtos (nome, preço, estoque, código de barras) de forma independente do fluxo de venda.
    **RF04 - Operação do Carrinho:** O sistema deve permitir adicionar itens ao carrinho, alterar quantidades, remover itens e aplicar descontos (em % ou R$) na finalização da venda.
    **RF05 - Múltiplas Formas de Pagamento:** O sistema deve registrar o pagamento da venda por Dinheiro, VR, VA, Cartão (Crédito/Débito) ou PIX.
    **RF06 - Controle de Turno de Caixa:** O sistema deve registrar a abertura do caixa (com valor de fundo inicial) e o fechamento do caixa (com o total consolidado das vendas do turno).
    **RF07 - AVISO de estoque baixo:** O sistema deverá ter um aviso para caso o produto esteja com poucas unidades (para que os operadores e administradores tenham ciencia disso)


    ## Requisitos NÃO FUNCIONAIS

    **RNF01 - Desempenho e Latência:** A busca de produtos e leitura de código de barras deve responder em tempo inferior a **300ms** para evitar lentidão na fila.
    **RNF02 - Usabilidade na Frente de Caixa:** A interface de vendas deve suportar navegação e comandos via **atalhos de teclado** (ex: F1, Enter, Esc), minimizando a necessidade do uso do mouse.
    **RNF03 - Persistência do Estado da Venda:** O carrinho da venda atual não deve ser perdido em caso de atualização acidental do navegador ou oscilação de rede.

