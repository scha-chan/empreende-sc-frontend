# Configuração de GitHub Secrets para CI/CD

## 📌 Configuração Inicial

Para habilitar completamente a pipeline de CI/CD, você precisará configurar alguns secrets no repositório GitHub.

## 🔐 Como Adicionar Secrets

1. Vá para **Settings** do repositório no GitHub
2. Clique em **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Adicione cada secret conforme indicado abaixo

## 📋 Secrets Obrigatórios

### Para CI (Já está funcionando)
Nenhum secret é obrigatório para a pipeline de CI padrão.

## 📋 Secrets Opcionais (Para Deploy)

Configure apenas se você planeja ativar o workflow de deploy.

### 🚀 Vercel Deployment
Se você usar Vercel para hosting:

```
VERCEL_TOKEN          - Token de autenticação do Vercel
VERCEL_ORG_ID         - ID da organização no Vercel
VERCEL_PROJECT_ID     - ID do projeto no Vercel
```

**Como obter:**
1. Acesse [vercel.com/settings/tokens](https://vercel.com/settings/tokens)
2. Crie um novo token
3. Copie o token para `VERCEL_TOKEN`
4. ID da org e projeto estão em `vercel.json` do projeto

### 🔥 Firebase Deployment

```
FIREBASE_TOKEN        - Token de autenticação do Firebase
```

**Como obter:**
1. Execute: `firebase login:ci`
2. Siga as instruções de autenticação
3. Copie o token gerado

### 🌐 Netlify Deployment

```
NETLIFY_AUTH_TOKEN    - Token de autenticação do Netlify
NETLIFY_SITE_ID       - ID do site no Netlify
```

**Como obter:**
1. Acesse [app.netlify.com/user/applications](https://app.netlify.com/user/applications)
2. Crie um novo token pessoal
3. ID do site está em `netlify.toml` ou no dashboard

### 🖥️ Deploy via SCP (Servidor Pessoal)

```
DEPLOY_HOST           - Host/IP do servidor (ex: 192.168.1.100)
DEPLOY_USER           - Usuário SSH para conectar
DEPLOY_KEY            - Chave privada SSH (sem passphrase)
```

**Como gerar SSH key:**
```bash
ssh-keygen -t ed25519 -f deploy_key -N ""
# Copie o conteúdo de deploy_key para DEPLOY_KEY
# Copie o conteúdo de deploy_key.pub para ~/.ssh/authorized_keys no servidor
```

## ✅ Verificação

Para verificar que os secrets foram adicionados corretamente:

1. GitHub mostrará uma lista de secrets (com valores mascarados)
2. Na execução do workflow, você verá "secret" no log (sem revelar o valor)

## 🔒 Boas Práticas de Segurança

- ✅ Nunca compartilhe tokens ou chaves privadas
- ✅ Use tokens com escopo mínimo necessário
- ✅ Rotacione tokens regularmente
- ✅ Use chaves SSH sem passphrase para CI/CD
- ✅ Desabilite secrets antigos quando não forem mais necessários

## 🔄 Ciclo de Vida dos Secrets

1. **Criação**: Adicione no GitHub Settings
2. **Uso**: Referenciado como `${{ secrets.NOME_DO_SECRET }}`
3. **Rotação**: Atualize quando expirado ou comprometido
4. **Remoção**: Delete quando não for mais usado

## 📞 Suporte

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Vercel Documentation](https://vercel.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
