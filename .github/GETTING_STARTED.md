# Guia Completo da Pipeline CI/CD - EmpreendeSC

## 🎯 Objetivo

Este guia ajuda desenvolvedores a entender e utilizar corretamente a pipeline de CI/CD do projeto.

## 📦 Arquivos Criados

```
.github/
├── workflows/
│   ├── ci.yml              # Pipeline de Integração Contínua
│   └── deploy.yml          # Pipeline de Deploy (opcional)
├── CI_PIPELINE.md          # Documentação da pipeline
├── GITHUB_SECRETS.md       # Configuração de secrets
└── GETTING_STARTED.md      # Este arquivo
```

## ✨ O Que a Pipeline Faz

### ✅ Quando você faz um Push ou cria um Pull Request:

1. **Checkout do código** - Baixa seu código
2. **Setup Node.js** - Configura Node 20.x com cache
3. **Instalar dependências** - `npm ci`
4. **Validar formatação** - `npm run prettier:check`
5. **Rodar testes** - `npm test -- --run --coverage`
6. **Compilar aplicação** - `npm run build`
7. **Verificar segurança** - `npm audit`
8. **Armazenar artefatos** - Build + Coverage reports

## 🚀 Primeiros Passos

### 1️⃣ Clonar ou Atualizar o Repositório

```bash
git clone https://github.com/seu-usuario/empreende-sc-frontend.git
cd empreende-sc-frontend
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

### 3️⃣ Testar Localmente (Recomendado Antes de Push)

```bash
# Formatar código
npm run prettier:fix

# Rodar testes
npm test -- --run

# Fazer build
npm run build

# Verificar segurança
npm audit --audit-level=moderate
```

Se todos os passos acima passarem, você está pronto para fazer push! ✅

## 📊 Entendendo os Resultados

### Badge de Status

- 🟢 **Verde (Success)** - Todas as verificações passaram
- 🔴 **Vermelho (Failed)** - Uma ou mais verificações falharam
- 🟡 **Amarelo (Skipped)** - Algumas verificações foram puladas

### Visualizar Logs

1. Vá até seu Pull Request
2. Procure pela seção "Checks" 
3. Clique em "Details" para ver logs completos
4. Procure pela seção do erro

### Códigos de Erro Comuns

| Erro | Causa | Solução |
|------|-------|---------|
| `prettier check failed` | Código não formatado | `npm run prettier:fix` |
| `test failed` | Teste não passou | Verifique o teste e corrija |
| `build failed` | Erro de compilação TypeScript | Verifique tipos e sintaxe |
| `npm audit` warning | Vulnerabilidade em dependência | Atualize dependências |

## 🔄 Workflow Recomendado

```
1. Criar branch local
   $ git checkout -b feature/minha-funcionalidade

2. Fazer alterações no código

3. Testar localmente
   $ npm run prettier:fix
   $ npm test -- --run
   $ npm run build

4. Fazer commit
   $ git add .
   $ git commit -m "feat: descrição clara da mudança"

5. Fazer push
   $ git push origin feature/minha-funcionalidade

6. GitHub Actions executa automaticamente
   → Verifique os checks no PR

7. Se tudo passar, pedir review e fazer merge
```

## 🛠️ Troubleshooting

### "O prettier:check está falhando"
```bash
# Arrumar formatação
npm run prettier:fix

# Verificar o que foi mudado
git diff

# Fazer commit das mudanças
git add .
git commit -m "style: format code with prettier"
```

### "Os testes estão falhando"
```bash
# Rodar testes localmente com output detalhado
npm test

# Rodar um teste específico
npm test -- --grep "nome do teste"

# Rodar com coverage
npm test -- --run --coverage
```

### "O build está falhando"
```bash
# Limpar cache Angular
rm -rf .angular node_modules
npm install

# Tentar build novamente
npm run build

# Se persistir, verificar erros TypeScript
npx ng build --verbose
```

### "Secrets não estão funcionando"
- Verifique se os secrets foram adicionados em GitHub → Settings → Secrets
- Nomes dos secrets devem ser exatos (case-sensitive)
- Para adicionar novos secrets, vá em Settings → Secrets and variables → Actions

## 📈 Monitoramento

### Ver Histórico de Execuções

1. Vá ao repositório no GitHub
2. Clique em "Actions" no topo
3. Veja o histórico completo de todas as pipeline executions

### Download de Artefatos

Os artefatos (build + coverage) ficam disponíveis por 5 dias:

1. Vá em "Actions" → Selecione a execução
2. Role até "Artifacts"
3. Clique para download

## 🚀 Próximos Passos

### Ativar Deploy Automático
Se você quer fazer deploy automático após sucesso da CI:

1. Escolha sua plataforma (Vercel, Firebase, Netlify, etc)
2. Configure os GitHub Secrets conforme [GITHUB_SECRETS.md](./GITHUB_SECRETS.md)
3. Descomente as seções relevantes em `workflows/deploy.yml`
4. Faça push para testar

### Adicionar Mais Verificações
Você pode estender a pipeline adicionando:

- **SonarQube** - Análise de qualidade de código
- **CodeCov** - Rastreamento de cobertura
- **Lighthouse** - Auditoria de performance
- **Custom scripts** - Suas próprias validações

## 📞 Dúvidas?

- Consulte [CI_PIPELINE.md](./CI_PIPELINE.md) para detalhes técnicos
- Consulte [GITHUB_SECRETS.md](./GITHUB_SECRETS.md) para configuração de secrets
- Check GitHub Actions documentation: https://docs.github.com/en/actions

---

**Happy coding! 🎉**
