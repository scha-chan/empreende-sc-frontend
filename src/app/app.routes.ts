import { Routes } from '@angular/router';
import { EMPREENDIMENTOS_ROUTES } from './features/empreendimentos/empreendimentos.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'empreendimentos',
    pathMatch: 'full',
  },
  {
    path: 'empreendimentos',
    children: EMPREENDIMENTOS_ROUTES,
  },
];
