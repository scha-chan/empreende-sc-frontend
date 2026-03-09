## 📌 Usando o componente LoadingComponent

O componente `LoadingComponent` está centralizado em `src/app/shared/components/` e pode ser reutilizado em qualquer lugar do projeto.

### Importação:

```typescript
import { LoadingComponent } from '@app/shared/components';

@Component({
  imports: [LoadingComponent, ...],
  // ...
})
```

### No template:

```html
<app-loading [isLoading]="isLoading"></app-loading>
```

### Exemplo completo (como no form):

```typescript
export class ItemListComponent {
  isLoading = false;

  ngOnInit() {
    this.isLoading = true;
    // carrega dados...
    this.isLoading = false;
  }
}
```

```html
<app-loading [isLoading]="isLoading"></app-loading>

<table *ngIf="!isLoading">
  <!-- conteúdo da tabela -->
</table>
```

### Inputs disponíveis:

| Input | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `isLoading` | boolean | false | Controla se o loading com dots animados está visível |

### Animação:
- 3 dots azuis (#0066cc) com efeito bounce
- Animação fluida e contínua
- Sem texto (apenas a animação visual)
