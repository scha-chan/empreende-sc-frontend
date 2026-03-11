# CI Pipeline - EmpreendeSC

## 📋 Visão Geral

Esta pipeline de CI/CD foi configurada para validar automaticamente todos os pull requests e pushes para as branches `main` e `develop`. A pipeline garante que o código mantém os padrões de qualidade do projeto.

## 🔄 Fluxo da Pipeline

### Verificações Executadas

1. **Instalação de Dependências**
   - Usa cache do npm para acelerar instalações
   - Executa `npm ci` (clean install) para garantir versões exatas

2. **Formatação de Código**
   - Valida formatação com Prettier
   - Garante consistência visual do código
   - Comando: `npm run prettier:check`

3. **Testes Unitários**
   - Executa testes com Vitest
   - Gera relatório de cobertura de código
   - Comando: `npm run test:coverage`

4. **Build da Aplicação**
   - Compila o projeto Angular
   - Valida otimizações e bundle size
   - Gera arquivos para produção
   - Comando: `npm run build`

5. **Verificação de Segurança**
   - Executa `npm audit` para detectar vulnerabilidades
   - Alerta para dependências com problemas de segurança

### Artefatos Gerados

- **dist/** - Build da aplicação compilada (retenção: 5 dias)
- **coverage/** - Relatório de cobertura de testes (retenção: 5 dias)

## 📚 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run prettier:check` | Verifica formatação do código |
| `npm run prettier:fix` | Formata automaticamente o código |
| `npm test` | Executa testes em modo watch |
| `npm test -- --run` | Executa testes uma única vez |
| `npm run build` | Compila a aplicação para produção |
| `npm start` | Inicia servidor de desenvolvimento |

## 🔧 Configurações

### Prettier (.prettierrc.json)
- Print Width: 100 caracteres
- Tab Width: 2 espaços
- Quotes simples: ativado
- Trailing Commas: ES5
- End of Line: LF

### Node.js
- Versão: 20.x (configurável via workflow)

## ✅ Checklist para Sucesso

Antes de fazer um push:

- [ ] Executar `npm run prettier:fix` para formatar código
- [ ] Executar `npm test -- --run` para confirmar testes passando
- [ ] Executar `npm run build` localmente para verificar build
- [ ] Não adicionar `node_modules` ou `dist/` ao git
- [ ] Commits descritivos em inglês ou português

## 🚀 Melhorias Futuras

Você pode expandir esta pipeline adicionando:

- **Integração com SonarQube** - Análise de qualidade de código
- **Deploy automático** - Deployment para staging/produção
- **Notificações Slack** - Alertas em tempo real
- **E-mail notifications** - Notificações de falhas
- **Comparação de performance** - Validação de bundle size
- **Lint adicional** - ESLint, stylelint com regras customizadas

## 📝 Exemplo de Workflow

```
1. Desenvolvedores criam uma feature branch
2. Faz commit e abre Pull Request
3. GitHub Actions executa a pipeline automaticamente
4. Se tudo passar:
   - Badge verde aparece no PR
   - Artefatos ficam disponíveis para download
5. Se algo falhar:
   - Badge vermelha aparece
   - Detalhes do erro aparecem nos logs
   - Deve ser corrigido antes do merge
6. Após approve e merge na main:
   - Pipeline executa novamente
   - Build final está pronto para deploy
```

## 🔗 Referências

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Angular Build Configuration](https://angular.io/cli/build)
- [Prettier Documentation](https://prettier.io/)
- [Vitest Documentation](https://vitest.dev/)
