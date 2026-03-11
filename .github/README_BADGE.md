# CI/CD Pipeline Badge & Status

Cole esta seção no seu **README.md** principal:

```markdown
## 🤖 CI/CD Pipeline

[![CI Pipeline](https://github.com/seu-usuario/empreende-sc-frontend/workflows/CI%20Pipeline/badge.svg?branch=main)](https://github.com/seu-usuario/empreende-sc-frontend/actions)
[![Deploy Status](https://github.com/seu-usuario/empreende-sc-frontend/workflows/Deploy%20to%20Production/badge.svg)](https://github.com/seu-usuario/empreende-sc-frontend/actions)

Esta aplicação possui um pipeline de CI/CD automatizado que:

- ✅ **Valida código** - Formatação com Prettier e Linting
- ✅ **Executa testes** - Coverage com Vitest  
- ✅ **Compila** - Build otimizado com Angular
- ✅ **Verifica segurança** - npm audit para vulnerabilidades
- ✅ **Deploy automático** - Disponível após CI passar (configurável)

### 📖 Documentação

- [Guia Rápido](/.github/GETTING_STARTED.md) - Para desenvolvedores
- [Fluxo Visual](/.github/FLOW_DIAGRAM.md) - Entenda como funciona
- [Troubleshooting](/.github/TROUBLESHOOTING.md) - Resolvendo problemas
- [Configuração Deploy](/.github/GITHUB_SECRETS.md) - Ativar deploy automático
- [Detalhes Técnicos](/.github/CI_PIPELINE.md) - Para arquitetos

### 🚀 Começar

```bash
# Testar localmente (recomendado antes de push)
npm run prettier:fix  # Formatar
npm test -- --run     # Testar  
npm run build         # Compilar
```

✅ Se tudo passar, você pode fazer push com confiança!
```

---

## Visual para Status Badge

Existem várias formas de exibir o status:

### Opção 1: Badge Simples
```markdown
[![CI](https://github.com/seu-usuario/empreende-sc-frontend/workflows/CI%20Pipeline/badge.svg)](https://github.com/seu-usuario/empreende-sc-frontend/actions)
```

### Opção 2: Múltiplos Badges
```markdown
[![CI Pipeline](https://github.com/seu-usuario/empreende-sc-frontend/workflows/CI%20Pipeline/badge.svg)](https://github.com/seu-usuario/empreende-sc-frontend/actions)
[![Deploy Status](https://github.com/seu-usuario/empreende-sc-frontend/workflows/Deploy%20to%20Production/badge.svg)](https://github.com/seu-usuario/empreende-sc-frontend/actions)
[![Commits](https://img.shields.io/github/last-commit/seu-usuario/empreende-sc-frontend?color=green)](https://github.com/seu-usuario/empreende-sc-frontend)
```

### Opção 3: Com Tags e Status
```markdown
[![CI Pipeline](https://github.com/seu-usuario/empreende-sc-frontend/workflows/CI%20Pipeline/badge.svg?branch=main)](https://github.com/seu-usuario/empreende-sc-frontend/actions?query=branch:main)
[![Release](https://img.shields.io/github/v/release/seu-usuario/empreende-sc-frontend)](https://github.com/seu-usuario/empreende-sc-frontend/releases)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
```

## Como Integrar no README.md

1. Abra o arquivo `README.md` do projeto
2. Encontre a seção apropriada (geralmente no início após título)
3. Cole o conteúdo acima com as URLs corretas
4. Substitua `seu-usuario` pelo seu nome de usuário GitHub
5. Faça commit e push

## Exemplos de Status

- 🟢 **Passing** - Pipeline executou com sucesso
- 🔴 **Failing** - Uma ou mais verificações falharam
- 🟡 **In Progress** - Pipeline está executando
- ⚫ **Skipped** - Pipeline foi pulada (ex: em branches protegidas)

## Atualizando Badges

Os badges atualizam automaticamente conforme você faz commits e pull requests. Não precisa fazer nada adicional!

---

**Nota:** Substitua `seu-usuario` pela sua conta GitHub para que os links funcionem.
