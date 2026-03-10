import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Empreendimento, Empreendedor, Municipio, EmpreendimentoCreate, EmpreendimentoUpdate } from '@app/core/models';
import { SEGMENTO_ATUACAO_OPTIONS } from '@app/core/enums';
import { LoadingComponent } from '@app/shared/components';
import { EmpreendimentoService, EmpreendedorService, MunicipioService } from '@app/core/services';

@Component({
  selector: 'app-empreendimento-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    LoadingComponent,
  ],
  templateUrl: './empreendimento-form.component.html',
  styleUrl: './empreendimento-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmpreendimentoFormComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  isSaving = false;
  isEditMode = false;
  empreendimentoId: number | null = null;

  empreendedores: Empreendedor[] = [];
  municipios: Municipio[] = [];
  filteredEmpreendedores: Empreendedor[] = [];
  filteredMunicipios: Municipio[] = [];
  isSearchingMunicipio = false;
  segmentos = SEGMENTO_ATUACAO_OPTIONS;

  showAddEmpreendedor = false;
  novoEmpreendedor = '';
  selectedEmpreendedor: Empreendedor | null = null;
  selectedMunicipio: Municipio | null = null;

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private empreendimentoService = inject(EmpreendimentoService);
  private empreendedorService = inject(EmpreendedorService);
  private changeDetectorRef = inject(ChangeDetectorRef);
  private municipioService = inject(MunicipioService);

  @ViewChild('municipioInput') municipioInput: any;

  ngOnInit(): void {
    this.initForm();
    this.carregarDados();
    this.verificarEditMode();
  }

  private initForm(): void {
    this.form = this.fb.group({
      nomeEmpreendimento: ['', [Validators.required, Validators.minLength(3)]],
      nomeEmpreendedor: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      segmento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      status: [true],
    });

    this.form.get('nomeEmpreendedor')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        this.filtrarEmpreendedores(value as string);
      });

    this.form.get('municipio')?.valueChanges
      .pipe(
        tap((value) => console.log('Mudança no campo municipio:', value)),
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((termo) => {
          console.log('Disparando filtro de municipi com termo:', termo);
          return of(termo);
        })
      )
      .subscribe((termo) => {
        console.log('Processando termo no subscribe:', termo);
        this.filtrarMunicipios(termo as string);
      });
  }

  private carregarDados(): void {
    this.isLoading = true;
    this.changeDetectorRef.markForCheck();
    this.empreendedorService.listar().subscribe({
      next: (empreendedores) => {
        this.empreendedores = empreendedores;
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
      error: (error) => {
        console.error('Erro ao carregar empreendedores:', error);
        this.isLoading = false;
        this.changeDetectorRef.markForCheck();
      },
    });
  }

  private verificarEditMode(): void {
    this.route.params.subscribe((params: any) => {
      if (params.id) {
        this.isEditMode = true;
        this.empreendimentoId = parseInt(params.id, 10);
        this.carregarEmpreendimento(this.empreendimentoId);
      }
    });
  }

  private carregarEmpreendimento(id: number): void {
    this.isLoading = true;
    this.changeDetectorRef.markForCheck();
    this.empreendimentoService
      .obterPorId(id)
      .subscribe({
        next: (empreendimento) => {
          this.selectedEmpreendedor = empreendimento.empreendedor;
          this.selectedMunicipio = empreendimento.municipio;
          this.form.patchValue({
            nomeEmpreendimento: empreendimento.nomeEmpreendimento,
            nomeEmpreendedor: empreendimento.empreendedor.nome,
            municipio: empreendimento.municipio.nome,
            segmento: empreendimento.segmento,
            email: empreendimento.email,
            status: empreendimento.status,
          });
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
        },
        error: (error) => {
          console.error('Erro ao carregar empreendimento:', error);
          this.isLoading = false;
          this.changeDetectorRef.markForCheck();
          this.voltarComReload();
        },
      });
  }

  private filtrarEmpreendedores(termo: string): void {
    if (!termo || termo.length === 0) {
      this.filteredEmpreendedores = this.empreendedores;
      this.showAddEmpreendedor = false;
      return;
    }

    const termoLower = termo.toLowerCase();
    this.filteredEmpreendedores = this.empreendedores.filter((e) =>
      e.nome.toLowerCase().includes(termoLower)
    );

    this.showAddEmpreendedor =
      this.filteredEmpreendedores.length === 0 && termo.length > 0;
    this.novoEmpreendedor = termo;
  }

  private filtrarMunicipios(termo: string): void {
    console.log('filtrarMunicipios chamado com termo:', termo, 'comprimento:', termo?.length);
    
    if (!termo || termo.length === 0) {
      console.log('Termo vazio, resetando filtro');
      this.filteredMunicipios = [];
      this.isSearchingMunicipio = false;
      this.form.get('municipio')?.enable();
      this.changeDetectorRef.markForCheck();
      return;
    }

    // Se tiver menos de 3 letras, não busca
    if (termo.length < 3) {
      console.log('Termo com menos de 3 letras, aguardando');
      this.filteredMunicipios = [];
      this.isSearchingMunicipio = false;
      this.form.get('municipio')?.enable();
      this.changeDetectorRef.markForCheck();
      return;
    }

    // Buscar no backend
    console.log('Buscando no backend com termo:', termo);
    this.isSearchingMunicipio = true;
    this.form.get('municipio')?.disable();
    this.changeDetectorRef.markForCheck();
    
    this.municipioService
      .buscar(termo)
      .subscribe({
        next: (municipios) => {
          console.log('Resultado da busca:', municipios);
          this.filteredMunicipios = municipios as Municipio[];
          this.isSearchingMunicipio = false;
          this.form.get('municipio')?.enable();
          this.changeDetectorRef.markForCheck();
          
          // Abrir o painel do autocomplete com os resultados
          setTimeout(() => {
            this.municipioInput?.matAutocompletePanel?.open();
          }, 100);
        },
        error: (error) => {
          console.error('Erro ao buscar municipios:', error);
          this.filteredMunicipios = [];
          this.isSearchingMunicipio = false;
          this.form.get('municipio')?.enable();
          this.changeDetectorRef.markForCheck();
        },
      });
  }

  public adicionarNovoEmpreendedor(): void {
    if (!this.novoEmpreendedor) return;

    const novoEmpreendedor: Empreendedor = {
      nome: this.novoEmpreendedor,
    };

    this.empreendedorService
      .criar(novoEmpreendedor)
      .subscribe({
        next: (empreendedor) => {
          this.empreendedores.push(empreendedor as Empreendedor);
          this.selecionarEmpreendedor(empreendedor as Empreendedor);
          this.changeDetectorRef.markForCheck();
        },
        error: (error) => {
          console.error('Erro ao adicionar empreendedor:', error);
          this.changeDetectorRef.markForCheck();
        },
      });
  }

  public selecionarEmpreendedor(empreendedor: Empreendedor): void {
    console.log('selecionarEmpreendedor chamado com:', empreendedor);
    this.selectedEmpreendedor = empreendedor;
    this.form.get('nomeEmpreendedor')?.setValue(empreendedor.nome, { emitEvent: false });
    this.filteredEmpreendedores = [];
    this.showAddEmpreendedor = false;
    this.changeDetectorRef.markForCheck();
  }

  public selecionarMunicipio(municipio: Municipio): void {
    console.log('selecionarMunicipio chamado com:', municipio);
    this.selectedMunicipio = municipio;
    this.form.get('municipio')?.setValue(municipio.nome);
    this.filteredMunicipios = [];
    this.changeDetectorRef.markForCheck();
  }

  salvar(): void {
    if (this.form.invalid || !this.selectedEmpreendedor || !this.selectedMunicipio) {
      console.warn('Formulário inválido ou campos obrigatórios não preenchidos');
      return;
    }

    if (!this.selectedEmpreendedor.id || !this.selectedMunicipio.id) {
      console.warn('Empreendedor ou Município sem ID');
      return;
    }

    this.isSaving = true;
    
    const dados = {
      nomeEmpreendimento: this.form.get('nomeEmpreendimento')?.value,
      empreendedorId: this.selectedEmpreendedor.id,
      municipioId: this.selectedMunicipio.id,
      segmento: this.form.get('segmento')?.value,
      email: this.form.get('email')?.value,
      status: this.form.get('status')?.value,
    };

    console.log('Dados a enviar:', dados);

    const operacao = this.isEditMode
      ? this.empreendimentoService.atualizar(this.empreendimentoId!, dados as EmpreendimentoUpdate)
      : this.empreendimentoService.criar(dados as EmpreendimentoCreate);

    operacao.subscribe({
      next: () => {
        this.isSaving = false;
        this.voltarComReload();
      },
      error: (error) => {
        console.error('Erro ao salvar:', error);
        this.isSaving = false;
      },
    });
  }

  public voltarComReload(): void {
    this.router.navigate(['/empreendimentos']);
  }

  voltar(): void {
    this.isLoading = false;
    this.router.navigate(['/empreendimentos']);
  }
}

