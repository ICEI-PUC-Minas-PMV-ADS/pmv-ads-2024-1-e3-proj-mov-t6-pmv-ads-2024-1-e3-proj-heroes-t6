# Plano de Testes de Software

Os requisitos para realização dos testes são:

- Um celular com o sistema Android
- Conectividade de internet para acesso ao aplicativo


Os testes funcionais a serem realizados no aplicativo são descritos a seguir.


| **Caso de Teste** | **CT-01 – Cadastrar Usuário** |
|:---:|:---:|
| Requisito Associado | RF-001 - A aplicação deve oferecer gerenciamento de usuários. |
| Objetivo do Teste | Verificar se a aplicação permite o cadastro adequado de usuários. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Clicar no botão "Cadastrar" <br> - Informar os dados necessários para cadastro <br> - Confirmar cadastro |
| Critério de Êxito | O cadastro do usuário deve ser efetuado com sucesso. |


| **Caso de Teste** | **CT-02 – Editar Usuário** |
|:---:|:---:|
| Requisito Associado | RF-001 - A aplicação deve oferecer gerenciamento de usuários. |
| Objetivo do Teste | Verificar se a aplicação permite a edição adequada de usuários. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no icone do usuário <br> - Clicar em "Editar Usuário" <br> - Modificar as informações cadastradas <br> - Confirmar edição |
| Critério de Êxito | A edição do usuário deve ser efetuada com sucesso. |


| **Caso de Teste** | **CT-03 – Excluir Usuário** |
|:---:|:---:|
| Requisito Associado | RF-001 - A aplicação deve oferecer gerenciamento de usuários. |
| Objetivo do Teste | Verificar se a aplicação permite a exclusão adequada de usuários. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no icone do usuário <br> - Clicar em "Excluir Usuário" <br> - Confirmar exclusão |
| Critério de Êxito | A exclusão do usuário deve ser efetuada com sucesso. |


| **Caso de Teste** | **CT-04 – Realizar Login** |
|:---:|:---:|
| Requisito Associado | RF-002 - A aplicação deve permitir que usuários pré-cadastrados realizem login. |
| Objetivo do Teste | Verificar se a aplicação permite que usuários pré-cadastrados realizem login com sucesso. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" |
| Critério de Êxito | O usuário é redirecionado para a página principal após efetuar o login com sucesso. |


| **Caso de Teste** | **CT-05 – Gerenciar Cartão de Crédito** |
|:---:|:---:|
| Requisito Associado | RF-003 - A aplicação deve permitir o gerenciamento de cartão de crédito. |
| Objetivo do Teste | Verificar se a aplicação permite o gerenciamento adequado de cartões de crédito. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no icone do usuário <br> - Clicar em "Gerenciar Cartões de Crédito" <br> - Adicionar um novo cartão de crédito <br> - Editar informações de um cartão de crédito existente <br> - Excluir um cartão de crédito |
| Critério de Êxito | Todas as operações de gerenciamento de cartão de crédito são realizadas com sucesso. |


| **Caso de Teste** | **CT-06 – Inserir Valor da Doação** |
|:---:|:---:|
| Requisito Associado | RF-004 - A aplicação deve permitir inserir o valor a ser doado. |
| Objetivo do Teste | Verificar se a aplicação permite ao usuário inserir o valor desejado para a doação. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar na campanha de arrecadação da instituição <br> - Clicar no botão "Doar" <br> - Inserir o valor a ser doado |
| Critério de Êxito | O valor inserido é considerado válido no campo preenchido. |


| **Caso de Teste** | **CT-07 – Visualizar Instituições Parceiras** |
|:---:|:---:|
| Requisito Associado | RF-005 - A aplicação deve permitir que o usuário veja todas as instituições parceiras recebendo doações. |
| Objetivo do Teste | Verificar se a aplicação exibe corretamente todas as instituições parceiras para doações. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Visualizar a lista de campanhas na página principal |
| Critério de Êxito | Todas as instituições parceiras são exibidas corretamente na aplicação. |


| **Caso de Teste** | **CT-08 – Visualizar Página "Sobre"** |
|:---:|:---:|
| Requisito Associado | RF-006 - A aplicação deve apresentar uma página sobre os heróis; <br> RF-007 - A aplicação deve apresentar o numero de contato das instituições parceiras. |
| Objetivo do Teste | Verificar se a aplicação apresenta corretamente a página sobre os heróis e suas instituições parceiras. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar no botão "Sobre" |
| Critério de Êxito | Visualizar corretamente todas as informações presentes na página. |


| **Caso de Teste** | **CT-09 – Doação por Cartão de Crédito** |
|:---:|:---:|
| Requisito Associado | RF-008 - A aplicação deve permitir a doação por cartão de crédito, pix. |
| Objetivo do Teste | Verificar se o usuário é capaz de realizar doações via cartão de crédito. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar na campanha de arrecadação da instituição <br> - Clicar no botão "Doar" <br> - Inserir o valor a ser doado <br> - Escolher a opção de pagamento por cartão de crédito <br> - Confirmar doação |
| Critério de Êxito | A doação por meio de cartão de crédito é realizada com sucesso. |


| **Caso de Teste** | **CT-10 – Doação por Pix** |
|:---:|:---:|
| Requisito Associado | RF-008 - A aplicação deve permitir a doação por cartão de crédito, pix. |
| Objetivo do Teste | Verificar se o usuário é capaz de realizar doações via pix. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar na campanha de arrecadação da instituição <br> - Clicar no botão "Doar" <br> - Inserir o valor a ser doado <br> - Escolher a opção de pagamento por pix <br> - Confirmar doação |
| Critério de Êxito | A doação por meio de pix é realizada com sucesso. |


| **Caso de Teste** | **CT-11 – Visualizar a Meta e o Valor Arrecadado pela Instituição** |
|:---:|:---:|
| Requisito Associado | RF-009 - A aplicação deverá mostrar a meta a ser arrecadada e quanto a instituição já arrecadou. |
| Objetivo do Teste | Verificar se o usuário é capaz de visualizar a meta a ser arrecadada e quanto a instituição já arrecadou. |
| Instruções | - Acessar a aplicação pelo dispositivo <br> - Informar o e-mail e senha cadastrados <br> - Clicar em "Entrar" <br> - Clicar na campanha de arrecadação da instituição |
| Critério de Êxito | Visualizar com sucesso as informações da meta e do valor arrecadado. |
