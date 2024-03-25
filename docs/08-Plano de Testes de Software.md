# Plano de Testes de Software

Os requisitos para realização dos testes são:

- Um celular com o sistema Android
- Conectividade de internet para acesso ao aplicativo


Os testes funcionais a serem realizados no aplicativo são descritos a seguir.


| **Caso de Teste** | **CT-01 – Cadastrar Usuário** |
|:---:|:---:|
| Requisito Associado | RF-001 - A aplicação deve oferecer gerenciamento de usuários. |
| Objetivo do Teste | Verificar se a aplicação permite o cadastro adequado de usuários. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Clicar em "Cadastrar" <br> - Informar os dados necessários para o cadastro <br> - Confirmar cadastro |
| Critério de Êxito | O cadastro do usuário deve ser efetuado com sucesso. |
| | |
| **Caso de Teste** | **CT-02 – Realizar Login** |
| Requisito Associado | RF-002 - A aplicação deve permitir que usuários pré-cadastrados realizem login. |
| Objetivo do Teste | Verificar se a aplicação permite que usuários pré-cadastrados realizem login com sucesso. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" |
| Critério de Êxito | O usuário é redirecionado para a página principal após efetuar o login com sucesso. |
| | |
| **Caso de Teste** | **CT-03 – Editar Usuário** |
| Requisito Associado | RF-001 - A aplicação deve oferecer gerenciamento de usuários. |
| Objetivo do Teste | Verificar se a aplicação permite a edição adequada de usuários. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no icone do usuário <br> - Clicar em "Editar Informações" <br> - Modificar as informações cadastradas <br> - Confirmar edição |
| Critério de Êxito | A edição do usuário deve ser efetuada com sucesso. |
| | |
| **Caso de Teste** | **CT-04 – Excluir Usuário** |
| Requisito Associado | RF-001 - A aplicação deve oferecer gerenciamento de usuários. |
| Objetivo do Teste | Verificar se a aplicação permite a remoção adequada de usuários. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no icone do usuário <br> - Clicar em "Remover minha conta" <br> - Confirmar remoção |
| Critério de Êxito | A remoção do usuário deve ser efetuada com sucesso. |
| | |
| **Caso de Teste** | **CT-05 – Cadastrar Cartão de Crédito** |
| Requisito Associado | RF-003 - A aplicação deve permitir o gerenciamento de cartão de crédito. |
| Objetivo do Teste | Verificar se a aplicação permite o cadastro adequado de cartões de crédito. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no icone do usuário <br> - Clicar em "Cartões" <br> - Clicar em "Adicionar novo cartão" <br> - inserir informações de um cartão de crédito existente <br> - Confirmar o cadastro do cartão |
| Critério de Êxito | O cadastro do cartão deve ser efetuado com sucesso. |
| | |
| **Caso de Teste** | **CT-06 – Editar Cartão de Crédito** |
| Requisito Associado | RF-003 - A aplicação deve permitir o gerenciamento de cartão de crédito. |
| Objetivo do Teste | Verificar se a aplicação permite a edição adequada de cartões de crédito. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no icone do usuário <br> - Clicar em "Cartões" <br> - Clicar em "Editar" no card do cartão desejado <br> - mudar as informações do cartão <br> - Confirmar a edição do cartão |
| Critério de Êxito | Os dados do cartão devem ser editados com sucesso. |
| | |
| **Caso de Teste** | **CT-07 – Excluir Cartão de Crédito** |
| Requisito Associado | RF-003 - A aplicação deve permitir o gerenciamento de cartão de crédito. |
| Objetivo do Teste | Verificar se a aplicação permite a remoção adequada de cartões de crédito. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no icone do usuário <br> - Clicar em "Cartões" <br> - Clicar em "Remover" no card do cartão desejado <br> - Confirmar a remoção do cartão |
| Critério de Êxito | Os dados do cartão devem ser removidos com sucesso. |
| | |
| **Caso de Teste** | **CT-08 – Visualizar Informações das Campanhas** |
| Requisito Associado | RF-005 - A aplicação deve permitir que o usuário veja todas as instituições parceiras recebendo doações;<br> RF-007 - A aplicação deve apresentar o numero de contato das instituições parceiras;<br> RF-009 - A aplicação deverá mostrar a meta a ser arrecadada e quanto a instituição já arrecadou. |
| Objetivo do Teste | Verificar se o usuário é capaz de visualizar todas as informações corretamente de cada campanha presente na aplicação. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar na campanha de arrecadação da instituição desejada <br> - Visualizar as informações |
| Critério de Êxito | Visualizar com sucesso as informações da campanha. |
| | |
| **Caso de Teste** | **CT-09 – Doação Por Pix** |
| Requisito Associado | RF-004 - A aplicação deve permitir inserir o valor a ser doado;<br> RF-008 - A aplicação deve permitir a doação por cartão de crédito, pix. |
| Objetivo do Teste | Verificar se o usuário é capaz de realizar doações via pix. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar na campanha de arrecadação da instituição <br> - Inserir o valor a ser doado <br> - Escolher a opção de pagamento por pix <br> - Confirmar a doação clicando em "Enviar" |
| Critério de Êxito | A doação por meio de pix é realizada com sucesso. |
| | |
| **Caso de Teste** | **CT-10 – Doação Por Cartão (Cadastrado)** |
| Requisito Associado | RF-004 - A aplicação deve permitir inserir o valor a ser doado;<br> RF-008 - A aplicação deve permitir a doação por cartão de crédito, pix. |
| Objetivo do Teste | Verificar se o usuário é capaz de realizar doações via um cartão de crédito já cadastrado. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar na campanha de arrecadação da instituição <br> - Inserir o valor a ser doado <br> - Escolher a opção de pagamento por cartão de crédito <br> - Selecionar o cartão desejado <br> - Confirmar a doação clicando em "Enviar" |
| Critério de Êxito | A doação por meio de cartão de crédito é realizada com sucesso. |
| | |
| **Caso de Teste** | **CT-11 – Doação Por Cartão (Sem Cadastro)** |
| Requisito Associado | RF-003 - A aplicação deve permitir o gerenciamento de cartão de crédito;<br> RF-004 - A aplicação deve permitir inserir o valor a ser doado;<br> RF-008 - A aplicação deve permitir a doação por cartão de crédito, pix. |
| Objetivo do Teste | Verificar se a aplicação permite cadastrar um novo cartão enquanto é realizada uma doação |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar na campanha de arrecadação da instituição <br> - Inserir o valor a ser doado <br> - Escolher a opção de pagamento por cartão de crédito <br> - Escolher cadastrar um novo cartão <br> - Inserir as informações necessárias <br> - confirmar o novo cadastro <br> - Selecionar o cartão desejado <br> - Confirmar a doação clicando em "Enviar" |
| Critério de Êxito | A doação por meio de cartão de crédito é realizada com sucesso. |
| | |
| **Caso de Teste** | **CT-12– Visualizar Página "Sobre"** |
| Requisito Associado | RF-006 - A aplicação deve apresentar uma página sobre os heróis. |
| Objetivo do Teste | Verificar se a aplicação apresenta corretamente a página sobre o Heroes |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Clicar no icone de informações |
| Critério de Êxito | Visualizar corretamente todas as informações presentes na página. |
