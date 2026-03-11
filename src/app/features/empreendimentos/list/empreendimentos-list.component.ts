import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';

import { Empreendimento } from '@app/core/models';
import { LoadingComponent, HeaderComponent } from '@app/shared/components';
import { StatusLabelPipe } from '@app/shared/pipes';
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
    MatChipsModule,
    LoadingComponent,
    HeaderComponent,
    StatusLabelPipe,
  ],
  templateUrl: './empreendimentos-list.component.html',
  styleUrl: './empreendimentos-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpreendimentosListComponent implements OnInit {
  empreendimentos: Empreendimento[] = [];
  displayedColumns: string[] = ['id', 'nomeEmpreendimento', 'nomeEmpreendedor', 'municipio', 'segmento', 'status', 'acoes'];
  isLoading = false;

  private empreendimentoService = inject(EmpreendimentoService);
  private router = inject(Router);
  private changeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.carregarEmpreendimentos(); 
  }

  private carregarEmpreendimentos(): void {
    this.isLoading = true;
    console.log('Carregando empreendimentos...');
    this.empreendimentoService
      .listar()
      .subscribe({
        next: (dados) => {
          console.log('Empreendimentos carregados:', dados);
          this.empreendimentos = dados;
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
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
}
