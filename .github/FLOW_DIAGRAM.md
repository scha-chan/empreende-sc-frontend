# 🚀 Pipeline Visual - EmpreendeSC

## Fluxo Geral

```
┌─────────────────────────────────────────────────────────────┐
│  Desenvolvedor faz PUSH ou abre PULL REQUEST               │
└────────────────────────────┬────────────────────────────────┘
                             │
                    GitHub Actions Acionado
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
   ┌────────────┐       ┌────────────┐      ┌────────────┐
   │  Node 20.x │       │ Instalação │      │   Cache    │
   │  Setup     │─────▶ │ npm ci     │─────▶│  npm       │
   └────────────┘       └────────────┘      └────────────┘
                             │
                             ▼
        ┌────────────────────┴────────────────────┐
        │                                         │
        ▼                                         ▼
   ┌───────────────┐                     ┌──────────────┐
   │ Prettier Check│                     │  Unit Tests  │
   │ (Formatação) │                     │  (Vitest)    │
   └────────┬──────┘                     └──────┬───────┘
            │                                   │
     ❌ Falha?                            ❌ Falha?
     └─▶ Pipeline para                    └─▶ Pipeline para
            │                                   │
            ✅ OK                              ✅ OK
            │                                   │
            └───────────────┬───────────────────┘
                            │
                            ▼
                   ┌──────────────────┐
                   │   Build Angular  │
                   │  npm run build   │
                   └────────┬─────────┘
                            │
                     ❌ Falha?
                     └─▶ Pipeline para
                            │
                            ✅ OK
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
   ┌─────────┐         ┌────────┐         ┌──────────┐
   │ Build   │         │Security│         │ Coverage │
   │Artifacts│         │ Check  │         │ Reports  │
   │(Store)  │         │npm audit        │ (Store)  │
   └─────────┘         └────────┘         └──────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                    ✅ PIPELINE SUCESSO
                            │
                    ┌───────┴────────┐
                    │                │
             (Em main)         (Em outras branches)
                    │                │
                    ▼                ▼
            ┌──────────────┐   ┌──────────────┐
            │ Deploy Ready │   │ Ready to Merge
            │ (Opcional)   │   │              │
            └──────────────┘   └──────────────┘
```

## Checklist Local (Antes de Push)

Executar estes comandos localmente para evitar falhas na pipeline:

```bash
# 1. Formatar código
npm run prettier:fix

# 2. Rodar testes
npm test -- --run

# 3. Fazer build
npm run build

# 4. Verificar segurança
npm audit --audit-level=moderate
```

✅ Se todos passarem, você pode fazer push com confiança!

## Tempo de Execução

| Etapa | Tempo Típico |
|-------|-------------|
| Setup + Cache | ~10s |
| Install deps | ~20s |
| Prettier check | ~5s |
| Tests | ~30s |
| Build | ~40s |
| Security check | ~5s |
| **Total** | **~1-2 min** |

## O Que Acontece em Cada Branch

### 🌿 Branch `main`
- ✅ Executa CI completa
- ✅ Build artifacts guardados
- ✅ Deploy automático (se configurado)

### 🌿 Branch `develop`
- ✅ Executa CI completa (sem deploy automático)

### 🌿 Outras branches
- ✅ Executa CI quando pull request é aberto

## Artifacts Disponíveis

Após sucesso, você pode baixar:

- **dist/** - Build compilado (5 dias)
- **coverage/** - Report de testes (5 dias)

Local: GitHub Actions → Selecione execução → Artifacts

## Status Badge

Para seu README, adicione:

```markdown
[![CI Pipeline](https://github.com/seu-usuario/empreende-sc-frontend/workflows/CI%20Pipeline/badge.svg?branch=main)](https://github.com/seu-usuario/empreende-sc-frontend/actions)
```

## Estrutura de Pastas

```
.github/
├── workflows/          📋 Pipelines
│   ├── ci.yml         ✅ CI (Testando)
│   └── deploy.yml     🚀 Deploy (Opcional)
└── docs/              📚 Documentação
    ├── CI_PIPELINE.md
    ├── GITHUB_SECRETS.md
    ├── GETTING_STARTED.md
    └── FLOW_DIAGRAM.md
```

## Próximos Passos

1. ✅ Commit e push dos arquivos de CI
2. ✅ GitHub criará automaticamente as actions
3. ✅ Verifique em: Actions → Selecione a execução
4. ✅ Teste abrindo um Pull Request
5. ✅ Configure deploy quando pronto

---

**Dúvidas? Veja [GETTING_STARTED.md](./GETTING_STARTED.md)**
