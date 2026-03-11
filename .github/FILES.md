# 📁 Arquivos da Pipeline CI/CD

## Resumo da Implementação

Esta é a documentação completa da pipeline CI/CD criada para o projeto **EmpreendeSC**.

## 📋 Arquivos Criados

### Workflows (Executados pelo GitHub Actions)

| Arquivo | Propósito |
|---------|-----------|
| `.github/workflows/ci.yml` | Pipeline de Integração Contínua - Executa testes, build e validações |
| `.github/workflows/deploy.yml` | Pipeline de Deploy - Opcional, executa após CI passar |

### Configurações do Prettier

| Arquivo | Propósito |
|---------|-----------|
| `.prettierrc.json` | Configuração de formatação de código (espaçamento, quotes, etc) |
| `.prettierignore` | Pasta e arquivos a ignorar na formatação |

### Package.json

| Campo |Descrição |
|-------|----------|
| `prettier:check` | Verifica se código está formatado |
| `prettier:fix` | Formata código automaticamente |

### Documentação

| Arquivo | Conteúdo |
|---------|----------|
| `CI_PIPELINE.md` | Explicação técnica completa da pipeline |
| `GETTING_STARTED.md` | Guia passo a passo para desenvolvedores |
| `GITHUB_SECRETS.md` | Como configurar secrets para deploy |
| `FLOW_DIAGRAM.md` | Diagrama visual do fluxo |
| `TROUBLESHOOTING.md` | Soluções para problemas comuns |
| `FILES.md` | Este arquivo |

## 🎯 O Que a Pipeline Faz

```
git push
    ↓
GitHub Actions Acionado
    ↓
1. Instala dependências (npm ci)
2. Valida formatação (prettier:check)
3. Executa testes (vitest)
4. Compila aplicação (ng build)
5. Verifica segurança (npm audit)
6. Armazena artefatos (dist/ e coverage/)
    ↓
✅ Se tudo passa = Ready to merge
❌ Se algo falha = Deve ser corrigido
```

## 📊 Estrutura de Pastas

Antes:
```
.github/
```

Depois:
```
.github/
├── workflows/
│   ├── ci.yml           ← Integração Contínua
│   └── deploy.yml       ← Deploy (opcional)
├── CI_PIPELINE.md
├── GETTING_STARTED.md
├── GITHUB_SECRETS.md
├── FLOW_DIAGRAM.md
├── TROUBLESHOOTING.md
└── FILES.md             ← Este arquivo
```

## ✅ Checklist de Implementação

- [x] Criar workflows na pasta `.github/workflows/`
- [x] Configurar Prettier (`.prettierrc.json`, `.prettierignore`)
- [x] Adicionar scripts ao `package.json`
- [x] Criar documentação completa
- [x] Exemplos de deploy (comentados)
- [x] Guia de troubleshooting

## 🚀 Próximos Passos

1. **Fazer commit e push dos arquivos:**
   ```bash
   git add .github
   git add package.json
   git add .prettierrc.json
   git add .prettierignore
   git commit -m "ci: setup github actions ci pipeline"
   git push origin main
   ```

2. **Visualizar a pipeline:**
   - Vá para GitHub Actions
   - Você verá a execução sendo iniciada
   - Acompanhe os logs

3. **Testar em um Pull Request:**
   - Crie uma nova branch
   - Faça uma pequena mudança
   - Abra um PR
   - Veja a pipeline executar automaticamente

4. **Ativar Deploy (opcional):**
   - Siga [GITHUB_SECRETS.md](./GITHUB_SECRETS.md)
   - Configure seus secrets
   - Descomente as seções no `deploy.yml`

## 📞 Documentação

Cada arquivo possui um propósito específico:

- **Novo no projeto?** → Leia [GETTING_STARTED.md](./GETTING_STARTED.md)
- **Pipeline quebrou?** → Veja [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)
- **Detalhes técnicos?** → Consulte [CI_PIPELINE.md](./CI_PIPELINE.md)
- **Quer fazer deploy?** → Siga [GITHUB_SECRETS.md](./GITHUB_SECRETS.md)
- **Quer visualizar?** → Veja [FLOW_DIAGRAM.md](./FLOW_DIAGRAM.md)

## 🎓 Aprender Mais

- [GitHub Actions Official Docs](https://docs.github.com/en/actions)
- [Angular Build Documentation](https://angular.io/cli/build)
- [Prettier Documentation](https://prettier.io/)
- [Vitest Documentation](https://vitest.dev/)

---

**Criado em:** 11 de Março de 2026  
**Projeto:** EmpreendeSC  
**Versão Angular:** 21.2.1
