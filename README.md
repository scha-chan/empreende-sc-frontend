# EmpreendeSC

Plataforma de gestão de empreendimentos do estado de Santa Catarina. 

A apresentação (PIT) se encontra no youtube:
https://youtu.be/rNhbed324uk

## 📋 Sobre o Projeto

Esse projeto propõe a criação de um sistema web simples para cadastro e gerenciamento de empreendimentos do estado de Santa Catarina.

EmpreendeSC é uma aplicação web desenvolvida em Angular que permite o cadastro e gerenciamento de empreendimentos, empreendedores e informações relacionadas. A plataforma oferece uma interface intuitiva com validação de dados, notificações em tempo real e tratamento robusto de erros.

### �️ Arquitetura

A arquitetura é baseada em cliente-servidor com API REST:

```
┌─────────────────────────────────────────────────────────────────┐
│                     FRONTEND (Angular 21)                       │
│  - Componentes Standalone                                       │
│  - Reactive Forms com Validators                                │
│  - Angular Material Components                                  │
│  - RxJS para Programação Reativa                                │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                      HTTP Requests (REST)
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND (Node.js + Express)                        │
│  - API REST Routes                                              |
└─────────────────────────────────────────────────────────────────┘
                              ↓
                       Database Access
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  DATABASE (SQLite)                              │
│  - Tabelas: Empreendimentos, Empreendedores, Municípios         │
│  - Armazenamento persistente de dados                           │
└─────────────────────────────────────────────────────────────────┘

```
### 📁 Estrutura de Pastas

```
empreende-sc-frontend/
├── src/
│   └── app/
│       ├── core/
│       │   ├── enums/
│       │   ├── models/
│       │   └── services/
│       ├── features/
│       │   └── empreendimentos/
│       │       ├── list/
│       │       └── form/
│       └── shared/
│           ├── components/
│           │   ├── header/
│           │   └── loading/
│           ├── directives/
│           └── pipes/
├── public/
├── coverage/
└── .github/
```

### �🎨 Design e Interface

A aplicação foi desenvolvida utilizando **Angular Material** como bibliotéca de componentes e template visual. O Material Design 3 fornece uma experiência de usuário moderna, responsiva e consonância com as melhores práticas de design de interface. Todos os componentes visuais (tabelas, formulários, botões, cards, ícones, etc.) seguem os princípios do Material Design.

## 📦 Funcionalidades Principais

#### **Empreendimentos**
Cadastro completo de empreendimentos com informações detalhadas:
- **Nome do Empreendimento**: Identificação única do negócio
- **Empreendedor**: Associação com um empreendedor cadastrado (é possível adicionar novo durante o cadastro)
- **Município**: Localização geográfica do empreendimento (com busca dinâmica por 3+ letras)
- **Segmento**: Classificação do segmento de atuação do negócio
- **Contato**: Email (opcional) e/ou Telefone (opcional) - é obrigatório ter pelo menos um dos dois
- **Status**: Ativo ou Inativo

**Validações**:
- Email opcional mas deve ser válido (se preenchido)
- Telefone opcional mas deve estar no formato (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX (se preenchido)
- Pelo menos um contato (email ou telefone) deve estar preenchido ao salvar

#### **Empreendedores**

- **Nome**: Identificação do empreendedor
- Possibilidade de criar novo empreendedor durante o cadastro de empreendimento
- Autocomplete com busca para uma seleção rápida

#### **Municípios**
Base de dados de municípios do IBGE de Santa Catarina:
- **Busca dinâmica**: Digite 3 ou mais letras para buscar
- **Autocomplete**: Resultados aparecem conforme você digita
- **Informações**: Nome e estado do município
- Integração com API backend para dados sempre atualizados


## 🔔 Sistema de Notificações

A aplicação utiliza um serviço centralizado de notificações com três tipos de mensagens:

- **Sucesso** (Verde): Operações realizadas com sucesso
- **Aviso** (Laranja): Mensagens informativas ou validações
- **Erro** (Vermelho): Erros na operação ou problemas de conexão

## 🛠️ Tratamento de Erros de Conexão

Quando não for possível conectar ao servidor, a mensagem exibida será:
> "Falha ao buscar os dados do servidor"

Em vez de mensagens técnicas ou erros genéricos.

## � Backend

Este projeto é uma aplicação frontend que funciona em conjunto com uma API backend. O repositório do backend pode ser encontrado em:

📍 **Repositório**: `https://github.com/scha-chan/empreende-sc-backend`.

### Configuração do Backend

Para que a aplicação funcione corretamente, você precisa ter o backend rodando localmente. Consulte o repositório do backend para instruções de instalação e configuração.

A aplicação frontend faz requisições HTTP para o backend, incluindo:
- Listagem, criação, atualização e exclusão de empreendimentos
- Gestão de empreendedores
- Busca de municípios

**Importante**: Certifique-se de que o backend está rodando na porta esperada (`http://localhost:3000`) antes de iniciar a aplicação frontend.

## �🚀 Servidor de Desenvolvimento

Para iniciar um servidor local de desenvolvimento, execute:

```bash
ng serve
```

ou utilize o npm:

```bash
npm start
```

Depois que o servidor estiver em execução, abra seu navegador e navegue até `http://localhost:4200/`. A aplicação será recarregada automaticamente sempre que você modificar algum arquivo de origem.

## 🏗️ Scaffolding de Código

O Angular CLI inclui ferramentas poderosas de geração de código. Para gerar um novo componente, execute:

```bash
ng generate component nome-do-componente
```

Para obter uma lista completa de esquemas disponíveis (como `components`, `directives` ou `pipes`), execute:

```bash
ng generate --help
```

## 🔨 Build

Para fazer o build do projeto, execute:

```bash
ng build
```

Isso compilará seu projeto e armazenará os artefatos de build no diretório `dist/`. Por padrão, o build de produção otimiza sua aplicação para performance e velocidade.

## ✅ Executar Testes Unitários

Para executar testes unitários com o executor de testes [Vitest](https://vitest.dev/), use o seguinte comando:

```bash
ng test
```

ou

```bash
npm test
```

## 🧪 Testes End-to-End

Para testes end-to-end (e2e), execute:

```bash
ng e2e
```

O Angular CLI não vem com um framework de teste end-to-end por padrão. Você pode escolher um que se adeque às suas necessidades.


## 🛠️ Tecnologias Utilizadas

Este projeto foi gerado utilizando [Angular CLI](https://github.com/angular/angular-cli) versão 21.2.1.

- **Angular 21+**: Framework de desenvolvimento
- **Angular Material**: Componentes de interface
- **TypeScript**: Linguagem de programação
- **RxJS**: Programação reativa
- **Material Design 3**: Sistema de design

## 📦 Dependências Principais

- `@angular/core`: Core do Angular
- `@angular/material`: Componentes Material Design
- `@angular/cdk`: Componentes e utilitários
- `rxjs`: Biblioteca reativa
- `sass`: Pré-processador CSS

## 📚 Recursos Adicionais

Para mais informações sobre como usar o Angular CLI, incluindo referências de comandos detalhadas, visite a página [Visão Geral e Referência de Comandos do Angular CLI](https://angular.dev/tools/cli).
