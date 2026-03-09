import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

import { Empreendimento } from '@app/core/models';
import { LoadingComponent } from '@app/shared/components';
import { EmpreendimentoService } from '@app/core/services';

@Component({
  selector: 'app-empreendimentos-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    LoadingComponent,
  ],
  templateUrl: './empreendimentos-list.component.html',
  styleUrl: './empreendimentos-list.component.scss',
})
export class EmpreendimentosListComponent implements OnInit, OnDestroy {
  empreendimentos: Empreendimento[] = [];
  displayedColumns: string[] = ['id', 'nomeEmpreendimento', 'nomeEmpreendedor', 'municipio', 'segmento', 'status', 'acoes'];
  isLoading = false;

  private destroy$ = new Subject<void>();

  constructor(
    private empreendimentoService: EmpreendimentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarEmpreendimentos();
  }

  private carregarEmpreendimentos(): void {
    this.isLoading = true;
    this.empreendimentoService
      .listar()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (dados) => {
          this.empreendimentos = dados;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar empreendimentos:', error);
          this.isLoading = false;
        },
      });
  }

  novo(): void {
    this.router.navigate(['/empreendimentos/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/empreendimentos', id]);
  }

  deletar(id: number): void {
    if (confirm('Tem certeza que deseja deletar este empreendimento?')) {
      this.isLoading = true;
      this.empreendimentoService
        .deletar(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.carregarEmpreendimentos();
          },
          error: (error) => {
            console.error('Erro ao deletar:', error);
            this.isLoading = false;
          },
        });
    }
  }

  getStatusLabel(status: boolean): string {
    return status ? 'Ativo' : 'Inativo';
  }

  getStatusColor(status: boolean): string {
    return status ? 'primary' : 'warn';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
