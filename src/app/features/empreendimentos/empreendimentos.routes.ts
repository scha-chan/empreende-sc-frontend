import { Routes } from '@angular/router';
import { EmpreendimentosListComponent } from './list/empreendimentos-list.component';
import { EmpreendimentoFormComponent } from './form/empreendimento-form.component';

export const EMPREENDIMENTOS_ROUTES: Routes = [
  {
    path: '',
    component: EmpreendimentosListComponent,
  },
  {
    path: 'novo',
    component: EmpreendimentoFormComponent,
  },
  {
    path: ':id',
    component: EmpreendimentoFormComponent,
  },
];
