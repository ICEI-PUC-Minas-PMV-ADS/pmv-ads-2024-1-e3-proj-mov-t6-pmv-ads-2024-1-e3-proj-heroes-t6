# Arquitetura da Solução

O diagrama de arquitetura de solução é uma representação visual das estruturas básicas do software afim de ilustrar seu sistema como um todo.

![Arquitetura de Contexto Heroes jpeg](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-heroes-t6/assets/131215140/76eebd66-f008-49a2-8ec8-b319d559af6d) <sub> Figura 01 - Diagrama de Arquitetura da Solução - Produzido com Microsoft Excel <sub>


## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

![Diagramas UML (3)](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-heroes-t6/assets/131215140/5fc26a8a-74dd-40f6-8647-69218e793f16) <sub> Figura 02 - Diagrama de Classes - Produzido com Lucidchart <sub>


## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.

![Diagrama ER 1](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-heroes-t6/assets/131215140/758e34ae-2d83-49d2-a1f9-b61d514601be) <sub> Figura 03 - Modelo ER - Produzido com Lucidchart <sub>


## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.

![Esquema Relacional](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-heroes-t6/assets/131215140/95a9df99-13fe-4ef2-ab56-e7f742f20210)       
<sub> Figura 04 - Esquema Relacional - Produzido com dbdiagram.io <sub>


## Modelo Físico

Segue abaixo um print do modelo físico das tabelas do projeto, o arquivo SQL pode ser encontrado em src/bd. <br>
![db_Heroes_print](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-heroes-t6/assets/131215140/efe5160c-7e35-4368-aff0-1301c32ee354) <br>
<sub> Figura 05 - Print de modelo físico - Produzido com Visual Studio Code <sub>

## Tecnologias Utilizadas

Nossa solução abrange diversas tecnologias para desenvolvimento web e móvel, design de interface, gerenciamento de banco de dados, controle de versão e mais. Algumas das principais tecnologias que estamos utilizando incluem:

- Visual Studio Code - Um editor de código leve e altamente personalizável para desenvolvimento de software.

- Android Studio - IDE oficial para desenvolvimento de aplicativos Android.

- Excel - Um software de planilha eletrônica amplamente utilizado para análise de dados e criação de gráficos.

- MySQL - Um sistema de gerenciamento de banco de dados relacional de código aberto.

- Azure - Uma plataforma de computação em nuvem da Microsoft que oferece uma variedade de serviços, incluindo hospedagem de aplicativos.

- Git - Um sistema de controle de versão distribuído amplamente utilizado para rastrear mudanças no código fonte durante o desenvolvimento de software.

- GitHub - Uma plataforma de hospedagem de código fonte baseada em Git que oferece controle de versão e colaboração para projetos de software.

- Miro Design - Uma ferramenta colaborativa de quadro branco online para brainstorming, fluxos de trabalho visuais e design thinking.

- LucidChart - Uma ferramenta de diagramação e visualização de dados baseada na web para criar diagramas, wireframes e fluxogramas.

- React Native - Um framework JavaScript para desenvolvimento de aplicativos móveis multiplataforma.

- Node.js - Um ambiente de execução JavaScript que permite executar código JavaScript no servidor.

- JavaScript - Uma linguagem de programação amplamente usada para criar interatividade em páginas da web.


## Hospedagem

A hospedagem do aplicativo será feita pelo Azure.


## Qualidade de Software

Para padronizar a avaliação da qualidade do software em nosso projeto, iremos adotar os padrões da norma ISO/IEC 9216, atualizada pela norma ISO/IEC 25010. Essas normas propõem atributos de qualidade divididos em características principais e subcaracterísticas, como os apresentados a seguir:

![Diagrama de Qualidade](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t6-pmv-ads-2024-1-e3-proj-heroes-t6/assets/131215140/5f8a4786-4a13-4898-9d48-04c3b785e71b) <sub> Figura 06 - Diagrama de Qualidade - Produzido com Lucidchart <sub>

**Funcionalidade**:
 - *Interoperabilidade*: O sistema cumpre esse critério com a sua capacidade de interagir com sistemas Android.
 - *Segurança de acesso*: O sistema implementa esse critério a partir da autenticação de usuários, com senha criptografada no banco de dados.

**Confiabilidade**:
 - *Tolerância a falhas*: O sistema implementa esse critério através das avaliações pelos testes de usabilidade.

**Usabilidade**:
 - *Inteligibilidade*: O sistema implementa esse critério através das avaliações pelos testes de usabilidade.
 - *Apreensibilidade*: O sistema implementa esse critério através das avaliações pelos testes de usabilidade.

**Manutenibilidade**:
 - *Modificabilidade*: O sistema cumpre esse critério através da implementação e ajuste de funcionalidades.
