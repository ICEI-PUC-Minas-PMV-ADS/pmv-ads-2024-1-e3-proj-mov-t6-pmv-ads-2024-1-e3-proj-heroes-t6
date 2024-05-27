# Plano de Testes de Software

Os testes funcionais a serem realizados no aplicativo são descritos a seguir. 

| **Caso de Teste** | **CT-01 – Cadastrar Usuário** |
|:---:|:---:|
| Requisito Associado | RF-001 - A aplicação deve oferecer gerenciamento de usuários. |
| Objetivo do Teste | Verificar se a aplicação permite o cadastro adequado de usuários. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Clicar em "Cadastrar" <br> - Informar os dados necessários para o cadastro <br> - Confirmar cadastro |
| Critério de Êxito | O cadastro do usuário deve ser efetuado com sucesso. |
| | |
| **Caso de Teste** | **CT-02 – Realizar Login e Logout** |
| Requisito Associado | RF-002 - A aplicação deve permitir que usuários pré-cadastrados realizem login e logout. |
| Objetivo do Teste | Verificar se a aplicação permite que usuários pré-cadastrados realizem login e logout com sucesso. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no ícone de usuário <br> - Clicar em "Logout" |
| Critério de Êxito | - O usuário seja redirecionado para a página principal após efetuar o login com sucesso <br> - O usuário retorna para a página de Login após realizar o logout com sucesso |
| | |
| **Caso de Teste** | **CT-03 – Editar Usuário** |
| Requisito Associado | RF-001 - A aplicação deve oferecer gerenciamento de usuários. |
| Objetivo do Teste | Verificar se a aplicação permite a edição adequada de usuários. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de usuário <br> - Clicar em "Editar Informações" <br> - Modificar as informações cadastradas <br> - Confirmar edição |
| Critério de Êxito | A edição do usuário deve ser efetuada com sucesso. |
| | |
| **Caso de Teste** | **CT-04 – Excluir Usuário** |
| Requisito Associado | RF-001 - A aplicação deve oferecer gerenciamento de usuários. |
| Objetivo do Teste | Verificar se a aplicação permite a remoção adequada de usuários. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de usuário <br> - Clicar em "Remover minha conta" <br> - Confirmar remoção |
| Critério de Êxito | A remoção do usuário deve ser efetuada e o logout executado com sucesso. |
| | |
| **Caso de Teste** | **CT-05 – Visualizar Lista de Campanhas** |
| Requisito Associado | RF-003 - A aplicação deve permitir gerenciamento das campanhas de doações. |
| Objetivo do Teste | Verificar se o usuário é capaz de visualizar todas as campanhas. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Visualizar as campanhas já cadastradas na página inicial |
| Critério de Êxito | Visualizar com sucesso as campanhas. |
| | |
| **Caso de Teste** | **CT-06 – Criar Campanhas** |
| Requisito Associado | RF-003 - A aplicação deve permitir gerenciamento das campanhas de doações. |
| Objetivo do Teste | Verificar se o usuário é capaz de criar campanhas. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar em "+ Nova Campanha" <br> - Preencher as informações da campanha <br> - Confirmar criação |
| Critério de Êxito | Visualizar a nova campanha na página inicial. |
| | |
| **Caso de Teste** | **CT-07 – Editar Campanhas** | 
| Requisito Associado | RF-003 - A aplicação deve permitir gerenciamento das campanhas de doações. |
| Objetivo do Teste | Verificar se o usuário é capaz de editar suas campanhas. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de edição da campanha desejada <br> - Preencher as novas informações da campanha <br> - Confirmar edição |
| Critério de Êxito | Visualizar a campanha editada na página inicial. |
| | |
| **Caso de Teste** | **CT-08– Excluir Campanhas** |
| Requisito Associado | RF-003 - A aplicação deve permitir gerenciamento das campanhas de doações. |
| Objetivo do Teste | Verificar se o usuário é capaz de excluir suas campanhas. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de remoção da campanha desejada <br> - Confirmar remoção |
| Critério de Êxito | Visualizar que a campanha não está mais presente na página inicial. |
| | |
| **Caso de Teste** | **CT-09 – Visualizar e Realizar Doações** |
| Requisito Associado | RF-004 - A aplicação deve apresentar uma página para cada campanha, onde seja possível visualizar seus detalhes, o progresso da arrecadação e executar as doações através de uma chave pix. |
| Objetivo do Teste | Verificar se é possível visualizar o status da campanha e realizar uma doação. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar em uma campanha <br> - Visualizar as informações e progresso da campanha <br> - Informar o valor a ser doado <br> - Gerar a chave pix <br> - Confirmar doação |
| Critério de Êxito | - Visualizar com sucesso as informações atuais da campanha <br> - Executar a doação com sucesso |
| | |
| **Caso de Teste** | **CT-10– Visualizar Página "Sobre"** |
| Requisito Associado | RF-005 - A aplicação deve apresentar uma página sobre o Heroes. |
| Objetivo do Teste | Verificar se a aplicação apresenta corretamente a página sobre o Heroes |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações |
| Critério de Êxito | Visualizar corretamente todas as informações presentes na página. |
| | |
| **Caso de Teste** | **CT-11– Criar Avaliação** |
| Requisito Associado | RF-006 - A aplicação deve apresentar uma sessão de avaliação onde o usuário possa enviar e gerenciar suas opiniões. |
| Objetivo do Teste | Verificar se o usuário consegue avaliar a aplicação. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações <br> - Clicar em "Avaliar" <br> - Inserir a nota e o comentário <br> Confirmar a nova avaliação |
| Critério de Êxito | Visualizar a nova avaliação na lista. |
| | |
| **Caso de Teste** | **CT-12– Editar Avaliação** |
| Requisito Associado | RF-006 - A aplicação deve apresentar uma sessão de avaliação onde o usuário possa enviar e gerenciar suas opiniões. |
| Objetivo do Teste | Verificar se o usuário é capaz de editar sua avaliação. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações <br> - Clicar em "Lista de Avaliações" <br> - Clicar no ícone de edição da avaliação desejada <br> - Inserir as novas informações <br> Confirmar edição |
| Critério de Êxito | Visualizar a avaliação editada na lista. |
| | |
| **Caso de Teste** | **CT-13– Excluir Avaliação** |
| Requisito Associado | RF-006 - A aplicação deve apresentar uma sessão de avaliação onde o usuário possa enviar e gerenciar suas opiniões. |
| Objetivo do Teste | Verificar se o usuário é capaz de excluir sua avaliação. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações <br> - Clicar em "Lista de Avaliações" <br> - Clicar no ícone de remoção da avaliação desejada <br> - Confirmar remoção |
| Critério de Êxito | Visualizar que a avaliação não está mais presente na lista. |
| | |
| **Caso de Teste** | **CT-14– Criar Instituições** |
| Requisito Associado | RF-007 - A aplicação deve permitir gerenciamento das instituições parceiras através de um usuário administrativo. |
| Objetivo do Teste | Verificar se o usuário administrativo é capaz de criar instituições. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações <br> - Clicar em "Nova Instituição" <br> - Inserir o nome da instituição <br> - Confirmar o cadastro da nova instituição |
| Critério de Êxito | Visualizar a nova instituição na página Sobre. |
| | |
| **Caso de Teste** | **CT-15– Editar Instituições** |
| Requisito Associado | RF-007 - A aplicação deve permitir gerenciamento das instituições parceiras através de um usuário administrativo. |
| Objetivo do Teste | Verificar se o usuário administrativo é capaz de editar as instituições. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações <br> - Clicar no icone de edição da instituição desejada <br> - Inserir novos parâmetros da instituição <br> - Confirmar edição |
| Critério de Êxito | Visualizar a instituição editada na página Sobre. |
| | |
| **Caso de Teste** | **CT-16– Excluir Instituições** |
| Requisito Associado | RF-007 - A aplicação deve permitir gerenciamento das instituições parceiras através de um usuário administrativo. |
| Objetivo do Teste | Verificar se o usuário administrativo é capaz de remover as instituições. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações <br> - Clicar no ícone de remoção da campanha desejada <br> - Confirmar remoção |
| Critério de Êxito | Visualizar se a instituição foi removida da página Sobre. |
| | |
| **Caso de Teste** | **CT-17– Criar Comentários** |
| Requisito Associado | RF-008 - A aplicação deve permitir aos usuários enviarem e gerenciarem seus comentários as instituições. |
| Objetivo do Teste | Verificar se o usuário é capaz de adicionar novos comentários para as instituições. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações <br> - Clicar na instituição desejada <br> - Clicar para adicionar o novo comentário <br> - Inserir o comentário <br> - Confirmar a postagem do novo comentário |
| Critério de Êxito | Visualizar o novo comentário na lista. |
| | |
| **Caso de Teste** | **CT-18– Editar Comentários** |
| Requisito Associado | RF-008 - A aplicação deve permitir aos usuários enviarem e gerenciarem seus comentários as instituições. |
| Objetivo do Teste | Verificar se o usuário é capaz de editar seus comentários para as instituições. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações <br> - Clicar na instituição desejada <br> - Clicar no ícone de edição do comentário desejado <br> - Inserir o novo texto do comentário <br> - Confirmar edição |
| Critério de Êxito | Visualizar o comentário editado na lista. |
| | |
| **Caso de Teste** | **CT-19– Excluir Comentários** |
| Requisito Associado | RF-008 - A aplicação deve permitir aos usuários enviarem e gerenciarem seus comentários as instituições. |
| Objetivo do Teste | Verificar se o usuário é capaz de remover seus comentários para as instituições. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Realizar o login <br> - Clicar no ícone de informações <br> - Clicar na instituição desejada <br> - Clicar no ícone de remoção do comentário desejado <br> - Confirmar remoção |
| Critério de Êxito | Visualizar se o comentário foi removido da lista. |
