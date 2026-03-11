import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { describe, it, expect, beforeEach, vi } from 'vitest';

import { EmpreendimentoFormComponent } from './empreendimento-form.component';
import {
  EmpreendimentoService,
  EmpreendedorService,
  MunicipioService,
  NotificationService,
} from '@app/core/services';
import { Empreendedor, Municipio, Empreendimento } from '@app/core/models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

describe('EmpreendimentoFormComponent', () => {
  let component: EmpreendimentoFormComponent;
  let fixture: ComponentFixture<EmpreendimentoFormComponent>;
  let empreendimentoService: any;
  let empreendedorService: any;
  let municipioService: any;
  let notificationService: any;
  let router: any;
  let activatedRoute: any;
  let breakpointObserver: any;

  const mockEmpreendedores: Empreendedor[] = [
    { id: 1, nome: 'João Silva' },
    { id: 2, nome: 'Maria Santos' },
    { id: 3, nome: 'Pedro Oliveira' },
  ];

  const mockMunicipios: Municipio[] = [
    { id: 1, nome: 'Florianópolis', estado: 'SC' },
    { id: 2, nome: 'Joinville', estado: 'SC' },
    { id: 3, nome: 'Blumenau', estado: 'SC' },
  ];

  const mockEmpreendimento: Empreendimento = {
    id: 1,
    nomeEmpreendimento: 'Empresa A',
    empreendedor: mockEmpreendedores[0],
    municipio: mockMunicipios[0],
    segmento: 'TECNOLOGIA',
    email: 'empresa@example.com',
    telefone: '(48) 99999-9999',
    status: true,
  };

  beforeEach(async () => {
    empreendimentoService = {
      listar: vi.fn(),
      obterPorId: vi.fn(),
      criar: vi.fn(),
      atualizar: vi.fn(),
      deletar: vi.fn(),
    };
    empreendedorService = {
      listar: vi.fn(),
      obterPorId: vi.fn(),
      criar: vi.fn(),
      atualizar: vi.fn(),
      deletar: vi.fn(),
    };
    municipioService = {
      listar: vi.fn(),
      obterPorId: vi.fn(),
      buscar: vi.fn(),
      criar: vi.fn(),
      atualizar: vi.fn(),
      deletar: vi.fn(),
    };
    notificationService = {
      exibirSucesso: vi.fn(),
      exibirErro: vi.fn(),
      tratarErroHttp: vi.fn(),
    };
    router = {
      navigate: vi.fn(),
    };
    activatedRoute = {
      params: of({}),
    };
    breakpointObserver = {
      observe: vi.fn().mockReturnValue(
        of({ matches: false, breakpoints: { [Breakpoints.Handset]: false } })
      ),
    };

    await TestBed.configureTestingModule({
      imports: [
        EmpreendimentoFormComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: EmpreendimentoService, useValue: empreendimentoService },
        { provide: EmpreendedorService, useValue: empreendedorService },
        { provide: MunicipioService, useValue: municipioService },
        { provide: NotificationService, useValue: notificationService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: BreakpointObserver, useValue: breakpointObserver },
      ],
    }).compileComponents();

    empreendedorService.listar.mockReturnValue(of(mockEmpreendedores));
    empreendimentoService.obterPorId.mockReturnValue(of(mockEmpreendimento));

    fixture = TestBed.createComponent(EmpreendimentoFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.form).toBeDefined();
    expect(component.form.get('nomeEmpreendimento')).toBeDefined();
    expect(component.form.get('nomeEmpreendedor')).toBeDefined();
  });

  it('should load empreendedores on init', async () => {
    empreendedorService.listar.mockReturnValue(of(mockEmpreendedores));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(empreendedorService.listar).toHaveBeenCalled();
    expect(component.empreendedores).toEqual(mockEmpreendedores);
    expect(component.isLoading).toBeFalsy();
  });

  it('should validate form required fields', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const form = component.form;
    expect(form.valid).toBeFalsy();

    form.patchValue({
      nomeEmpreendimento: 'Empresa Teste',
      nomeEmpreendedor: 'João Silva',
      municipio: 'Florianópolis',
      segmento: 'TECNOLOGIA',
      email: 'test@example.com',
    });

    expect(form.valid).toBeTruthy();
  });

  it('should validate email format', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');

    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should validate phone format', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const phoneControl = component.form.get('telefone');

    phoneControl?.setValue('invalid');
    expect(phoneControl?.hasError('pattern')).toBeTruthy();

    phoneControl?.setValue('(48) 99999-9999');
    expect(phoneControl?.hasError('pattern')).toBeFalsy();
  });

  it('should require at least one contact', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const form = component.form;
    form.patchValue({
      nomeEmpreendimento: 'Empresa Teste',
      nomeEmpreendedor: 'João Silva',
      municipio: 'Florianópolis',
      segmento: 'TECNOLOGIA',
      email: '',
      telefone: '',
    });

    expect(form.hasError('atLeastOneContact')).toBeTruthy();
  });

  it('should select empreendedor', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    component.selecionarEmpreendedor(mockEmpreendedores[0]);

    expect(component.selectedEmpreendedor).toEqual(mockEmpreendedores[0]);
    expect(component.form.get('nomeEmpreendedor')?.value).toBe(mockEmpreendedores[0].nome);
  });

  it('should add new empreendedor', async () => {
    const novoEmpreendedor: Empreendedor = { id: 4, nome: 'Novo Empreendedor' };
    empreendedorService.criar.mockReturnValue(of(novoEmpreendedor));

    fixture.detectChanges();
    await fixture.whenStable();

    component.novoEmpreendedor = 'Novo Empreendedor';
    component.adicionarNovoEmpreendedor();

    await fixture.whenStable();

    expect(empreendedorService.criar).toHaveBeenCalled();
    expect(component.empreendedores).toContain(novoEmpreendedor);
  });

  it('should handle error when adding empreendedor', async () => {
    const error = { status: 400, message: 'Bad Request' };
    empreendedorService.criar.mockReturnValue(throwError(() => error));

    fixture.detectChanges();
    await fixture.whenStable();

    component.novoEmpreendedor = 'Novo Empreendedor';
    component.adicionarNovoEmpreendedor();

    await fixture.whenStable();

    expect(notificationService.exibirErro).toHaveBeenCalled();
  });

  it('should search municipios', async () => {
    municipioService.buscar.mockReturnValue(of(mockMunicipios));

    fixture.detectChanges();
    await fixture.whenStable();

    const municipioControl = component.form.get('municipio');
    municipioControl?.setValue('Flo');

    await fixture.whenStable();

    expect(municipioService.buscar).toHaveBeenCalled();
  });

  it('should select municipio', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    component.selecionarMunicipio(mockMunicipios[0]);

    expect(component.selectedMunicipio).toEqual(mockMunicipios[0]);
    expect(component.form.get('municipio')?.value).toBe(mockMunicipios[0].nome);
  });

  it('should save new empreendimento', async () => {
    empreendimentoService.criar.mockReturnValue(of(mockEmpreendimento as any));

    fixture.detectChanges();
    await fixture.whenStable();

    component.selectedEmpreendedor = mockEmpreendedores[0];
    component.selectedMunicipio = mockMunicipios[0];

    component.form.patchValue({
      nomeEmpreendimento: 'Empresa Teste',
      nomeEmpreendedor: 'João Silva',
      municipio: 'Florianópolis',
      segmento: 'TECNOLOGIA',
      email: 'test@example.com',
    });

    component.salvar();

    await fixture.whenStable();

    expect(empreendimentoService.criar).toHaveBeenCalled();
    expect(notificationService.exibirSucesso).toHaveBeenCalledWith('Empreendimento salvo com sucesso');
    expect(router.navigate).toHaveBeenCalledWith(['/empreendimentos']);
  });

  it('should navigate back when voltar is called', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    component.voltar();

    expect(router.navigate).toHaveBeenCalledWith(['/empreendimentos']);
  });

  it('should validate minLength for nomeEmpreendimento', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    const nomeControl = component.form.get('nomeEmpreendimento');
    nomeControl?.setValue('ab');

    expect(nomeControl?.hasError('minlength')).toBeTruthy();

    nomeControl?.setValue('abc');
    expect(nomeControl?.hasError('minlength')).toBeFalsy();
  });
});
