# 🐛 Guia de Troubleshooting - Pipeline CI/CD

## Problemas Comuns e Soluções

### 1. ❌ Prettier Check Falha

**Erro:**
```
Run npm run prettier:check
  prettier --check .
[error] src/app/app.component.ts: File is not properly formatted.
```

**Causa:** Código não está formatado conforme padrões

**Solução:**
```bash
# Formatar automaticamente
npm run prettier:fix

# Fazer commit da formatação
git add .
git commit -m "style: format code with prettier"

# Fazer push novamente
git push
```

---

### 2. ❌ Testes Falham

**Erro:**
```
FAIL  src/app/app.spec.ts
  ✓ should create (5ms)
  ✗ should render title (20ms)
    Error: Expected undefined toBe 'Welcome'
```

**Causa:** Um teste não passou localmente

**Solução:**
```bash
# Rodar testes no seu computador
npm test

# Ou rodar apenas um teste
npm test -- --grep "render title"

# Corrigir o código que falha et rodar novamente
# Fazer commit com fix
git add .
git commit -m "fix: update test expectations"
```

---

### 3. ❌ Build Falha

**Erro:**
```
error NG2001: NgModule 'AppModule' is not a standalone component
```

**Causa:** Erro de compilação TypeScript/Angular

**Solução:**
```bash
# Limpar cache e reinstalar
rm -rf .angular node_modules
npm install

# Rodar build novamente
npm run build

# Se persistir, verificar o erro com verbosidade
npx ng build --verbose 2>&1 | head -50

# Corrigir o erro no código
# Fazer commit
git add .
git commit -m "fix: resolve typescript compilation error"
```

---

### 4. ⚠️ Audit Warning (Vulnerabilidade)

**Aviso:**
```
npm notice 
npm notice New major version of npm available! 11.8.0 -> 12.0.0
npm notice To update run: npm install -g npm@latest
npm audit --audit-level=moderate
found 0 vulnerabilities
```

**Causa:** Dependências com potenciais vulnerabilidades

**Solução:**
```bash
# Ver detalhes das vulnerabilidades
npm audit

# Tentar corrigir automaticamente (nem sempre funciona)
npm audit fix

# Se necessário, atualizar manualmente
npm update @package/name

# Para vulnerabilidades graves, é prudente avisar no PR
```

---

### 5. 🟡 Node.js Version Issue

**Erro:**
```
The engine "node" is incompatible with this package: required: {"node":">=18.0.0"}, actual: "16.0.0"
```

**Causa:** Versão Node.js incompatível

**Solução:**
```bash
# Verificar versão local
node --version

# Atualizar Node.js localmente
# Via NVM (Linux/Mac)
nvm install 20
nvm use 20

# Via Chocolatey (Windows)
choco upgrade nodejs

# Via direito site
# Baixar em https://nodejs.org/
```

---

### 6. 🔴 Cache Issue (Dependências não instaladas)

**Erro:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Causa:** Problema com cache do npm

**Solução:**
```bash
# Limpar cache npm
npm cache clean --force

# Remover node_modules
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Fazer build novamente
npm run build
```

---

### 7. 📦 Module Not Found Error

**Erro:**
```
error TS2307: Cannot find module '@angular/material/button'
```

**Causa:** Dependência não instalada

**Solução:**
```bash
# Verificar se está em package.json
cat package.json | grep material

# Se não estiver, instalar
npm install @angular/material

# Se estiver, reinstalar
npm install

# Se persistir, verificar versão Angular
ng version
```

---

### 8. 🔗 Request Timeout (GitHub Actions)

**Erro:**
```
npm ERR! code ETIMEDOUT
npm ERR! network request to ... timed out
```

**Causa:** Conexão de rede lenta ou servidor npm down

**Solução:**
```bash
# Aumentar timeout local para teste
npm install --fetch-timeout=600000

# Re-triggar a pipeline no GitHub
# Vá em Actions → Clique no workflow falhado → Re-run jobs
```

---

### 9. ❌ Permission Denied (Deploy)

**Erro:**
```
Permission denied (publickey).
fatal: Could not read from remote repository.
```

**Causa:** Deploy key não configurada corretamente

**Solução:**
```bash
# Gerar nova SSH key
ssh-keygen -t ed25519 -f deploy_key -N ""

# Adicionar chave pública ao servidor
cat deploy_key.pub

# Adicionar chave privada como secret
# GitHub Settings → Secrets → DEPLOY_KEY
# Copiar conteúdo de deploy_key

# Testar conexão local
ssh -i deploy_key user@host
```

---

### 10. 🔶 Artifact Upload Fails

**Erro:**
```
Run actions/upload-artifact@v4
  with:
    name: dist-123
    path: dist/
Error: No files were found with the provided path: dist/
```

**Causa:** Build não foi gerado (falhou anteriormente)

**Solução:**
```bash
# Verificar se build passou
npm run build

# Se passou localmente mas não na CI
# Verificar se arquivo .angular-cache está em .gitignore
cat .gitignore | grep angular

# Verificar permissões de pasta
ls -la dist/
```

---

## 📊 Checklist de Debug

Quando algo falhar:

- [ ] Ler o log completo (não apenas o último erro)
- [ ] Executar os mesmos comandos localmente
- [ ] Verificar versões (Node, npm, Angular, TypeScript)
- [ ] Limpar cache (`npm cache clean --force`)
- [ ] Remover node_modules e reinstalar
- [ ] Fazer commit de apenas as mudanças relevantes
- [ ] Verificar formatação (`npm run prettier:check`)
- [ ] Rodar testes localmente (`npm test -- --run`)

---

## 🔗 Recursos Úteis

- [GitHub Actions Logs](https://docs.github.com/en/actions/managing-workflow-runs/viewing-workflow-run-history)
- [Angular Build Errors](https://angular.io/guide/build-errors)
- [npm Troubleshooting](https://docs.npmjs.com/cli/v9/using-npm/troubleshooting)
- [Vitest Debugging](https://vitest.dev/guide/debugging.html)

---

## 💡 Dica Pro

Se a pipeline falha e você não sabe por quê:

1. **Re-run a job** no GitHub
2. **Veja os logs completos**
3. **Execute localmente** para reproduzir
4. **Compare versões** entre sua máquina e CI

Isso resolve 99% dos problemas! 🎯
