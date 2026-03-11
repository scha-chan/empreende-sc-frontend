import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError, EMPTY } from 'rxjs';

import { EmpreendimentoFormComponent } from './empreendimento-form.component';
import {
  EmpreendimentoService,
  EmpreendedorService,
  MunicipioService,
  NotificationService,
} from '@app/core/services';
import { Empreendedor, Municipio, Empreendimento, EmpreendimentoCreate, EmpreendimentoUpdate } from '@app/core/models';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

describe('EmpreendimentoFormComponent', () => {
  let component: EmpreendimentoFormComponent;
  let fixture: ComponentFixture<EmpreendimentoFormComponent>;
  let empreendimentoService: jasmine.SpyObj<EmpreendimentoService>;
  let empreendedorService: jasmine.SpyObj<EmpreendedorService>;
  let municipioService: jasmine.SpyObj<MunicipioService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let router: jasmine.SpyObj<Router>;
  let activatedRoute: any;
  let breakpointObserver: jasmine.SpyObj<BreakpointObserver>;

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
    const empreendimentoServiceSpy = jasmine.createSpyObj('EmpreendimentoService', [
      'listar',
      'obterPorId',
      'criar',
      'atualizar',
      'deletar',
    ]);
    const empreendedorServiceSpy = jasmine.createSpyObj('EmpreendedorService', [
      'listar',
      'obterPorId',
      'criar',
      'atualizar',
      'deletar',
    ]);
    const municipioServiceSpy = jasmine.createSpyObj('MunicipioService', [
      'listar',
      'obterPorId',
      'buscar',
      'criar',
      'atualizar',
      'deletar',
    ]);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'exibirSucesso',
      'exibirErro',
      'tratarErroHttp',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const breakpointObserverSpy = jasmine.createSpyObj('BreakpointObserver', ['observe']);

    activatedRoute = { params: of({}) };

    await TestBed.configureTestingModule({
      imports: [
        EmpreendimentoFormComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: EmpreendimentoService, useValue: empreendimentoServiceSpy },
        { provide: EmpreendedorService, useValue: empreendedorServiceSpy },
        { provide: MunicipioService, useValue: municipioServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: BreakpointObserver, useValue: breakpointObserverSpy },
      ],
    }).compileComponents();

    empreendimentoService = TestBed.inject(EmpreendimentoService) as jasmine.SpyObj<EmpreendimentoService>;
    empreendedorService = TestBed.inject(EmpreendedorService) as jasmine.SpyObj<EmpreendedorService>;
    municipioService = TestBed.inject(MunicipioService) as jasmine.SpyObj<MunicipioService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    breakpointObserver = TestBed.inject(BreakpointObserver) as jasmine.SpyObj<BreakpointObserver>;

    empreendedorService.listar.and.returnValue(of(mockEmpreendedores));
    empreendimentoService.obterPorId.and.returnValue(of(mockEmpreendimento));
    breakpointObserver.observe.and.returnValue(of({ matches: false, breakpoints: { [Breakpoints.Handset]: false } } as any));

    fixture = TestBed.createComponent(EmpreendimentoFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', (done) => {
    fixture.detectChanges();

    setTimeout(() => {
      expect(component.form).toBeDefined();
      expect(component.form.get('nomeEmpreendimento')).toBeDefined();
      expect(component.form.get('nomeEmpreendedor')).toBeDefined();
      expect(component.form.get('municipio')).toBeDefined();
      expect(component.form.get('segmento')).toBeDefined();
      expect(component.form.get('email')).toBeDefined();
      expect(component.form.get('telefone')).toBeDefined();
      expect(component.form.get('status')).toBeDefined();
      done();
    }, 10);
  });

  it('should load empreendedores on init', (done) => {
    empreendedorService.listar.and.returnValue(of(mockEmpreendedores));

    fixture.detectChanges();

    setTimeout(() => {
      expect(empreendedorService.listar).toHaveBeenCalled();
      expect(component.empreendedores).toEqual(mockEmpreendedores);
      expect(component.isLoading).toBeFalse();
      done();
    }, 10);
  });

  it('should validate form required fields', () => {
    fixture.detectChanges();

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

  it('should validate email format', () => {
    fixture.detectChanges();

    const emailControl = component.form.get('email');
    emailControl?.setValue('invalid-email');

    expect(emailControl?.hasError('email')).toBeTruthy();

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.hasError('email')).toBeFalsy();
  });

  it('should validate phone format', () => {
    fixture.detectChanges();

    const phoneControl = component.form.get('telefone');

    phoneControl?.setValue('invalid');
    expect(phoneControl?.hasError('pattern')).toBeTruthy();

    phoneControl?.setValue('(48) 99999-9999');
    expect(phoneControl?.hasError('pattern')).toBeFalsy();

    phoneControl?.setValue('(48) 9999-9999');
    expect(phoneControl?.hasError('pattern')).toBeFalsy();
  });

  it('should require at least one contact (email or phone)', () => {
    fixture.detectChanges();

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

    form.patchValue({ email: 'test@example.com' });
    expect(form.hasError('atLeastOneContact')).toBeFalsy();
  });

  it('should filter empreendedores by search term', (done) => {
    fixture.detectChanges();

    const nomeEmpreendedorControl = component.form.get('nomeEmpreendedor');
    nomeEmpreendedorControl?.setValue('João');

    setTimeout(() => {
      expect(component.filteredEmpreendedores).toContain(mockEmpreendedores[0]);
      expect(component.filteredEmpreendedores.length).toBe(1);
      done();
    }, 10);
  });

  it('should show add empreendedor button when no match found', (done) => {
    fixture.detectChanges();

    const nomeEmpreendedorControl = component.form.get('nomeEmpreendedor');
    nomeEmpreendedorControl?.setValue('Inexistente');

    setTimeout(() => {
      expect(component.showAddEmpreendedor).toBeTruthy();
      expect(component.novoEmpreendedor).toBe('Inexistente');
      done();
    }, 10);
  });

  it('should select empreendedor when selecionarEmpreendedor is called', () => {
    fixture.detectChanges();

    component.selecionarEmpreendedor(mockEmpreendedores[0]);

    expect(component.selectedEmpreendedor).toEqual(mockEmpreendedores[0]);
    expect(component.form.get('nomeEmpreendedor')?.value).toBe(mockEmpreendedores[0].nome);
    expect(component.filteredEmpreendedores).toEqual([]);
    expect(component.showAddEmpreendedor).toBeFalsy();
  });

  it('should add new empreendedor', (done) => {
    const novoEmpreendedor: Empreendedor = { id: 4, nome: 'Novo Empreendedor' };
    empreendedorService.criar.and.returnValue(of(novoEmpreendedor));

    fixture.detectChanges();

    component.novoEmpreendedor = 'Novo Empreendedor';
    component.adicionarNovoEmpreendedor();

    setTimeout(() => {
      expect(empreendedorService.criar).toHaveBeenCalledWith(jasmine.objectContaining({ nome: 'Novo Empreendedor' }));
      expect(component.empreendedores).toContain(novoEmpreendedor);
      expect(component.selectedEmpreendedor).toEqual(novoEmpreendedor);
      done();
    }, 10);
  });

  it('should handle error when adding empreendedor', (done) => {
    const error = { status: 400, message: 'Bad Request' };
    empreendedorService.criar.and.returnValue(throwError(() => error));

    fixture.detectChanges();

    component.novoEmpreendedor = 'Novo Empreendedor';
    component.adicionarNovoEmpreendedor();

    setTimeout(() => {
      expect(notificationService.exibirErro).toHaveBeenCalled();
      done();
    }, 10);
  });

  it('should search municipios', (done) => {
    municipioService.buscar.and.returnValue(of(mockMunicipios));

    fixture.detectChanges();

    const municipioControl = component.form.get('municipio');
    municipioControl?.setValue('Flo');

    setTimeout(() => {
      expect(component.isSearchingMunicipio).toBeTruthy();
    }, 100);

    setTimeout(() => {
      expect(municipioService.buscar).toHaveBeenCalledWith('Flo');
      expect(component.filteredMunicipios).toEqual(mockMunicipios);
      expect(component.isSearchingMunicipio).toBeFalsy();
      done();
    }, 400);
  });

  it('should select municipio when selecionarMunicipio is called', () => {
    fixture.detectChanges();

    component.selecionarMunicipio(mockMunicipios[0]);

    expect(component.selectedMunicipio).toEqual(mockMunicipios[0]);
    expect(component.form.get('municipio')?.value).toBe(mockMunicipios[0].nome);
    expect(component.filteredMunicipios).toEqual([]);
  });

  it('should save new empreendimento', (done) => {
    empreendimentoService.criar.and.returnValue(of(mockEmpreendimento as any));

    fixture.detectChanges();

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

    setTimeout(() => {
      expect(empreendimentoService.criar).toHaveBeenCalled();
      expect(notificationService.exibirSucesso).toHaveBeenCalledWith('Empreendimento salvo com sucesso');
      expect(router.navigate).toHaveBeenCalledWith(['/empreendimentos']);
      done();
    }, 10);
  });

  it('should update existing empreendimento in edit mode', (done) => {
    activatedRoute.params = of({ id: '1' });
    empreendimentoService.atualizar.and.returnValue(of(mockEmpreendimento as any));

    fixture.detectChanges();

    setTimeout(() => {
      component.selectedEmpreendedor = mockEmpreendedores[0];
      component.selectedMunicipio = mockMunicipios[0];

      component.form.patchValue({
        nomeEmpreendimento: 'Empresa Atualizada',
        nomeEmpreendedor: 'João Silva',
        municipio: 'Florianópolis',
        segmento: 'TECNOLOGIA',
        email: 'test@example.com',
      });

      component.salvar();

      setTimeout(() => {
        expect(empreendimentoService.atualizar).toHaveBeenCalled();
        expect(notificationService.exibirSucesso).toHaveBeenCalledWith('Empreendimento salvo com sucesso');
        done();
      }, 10);
    }, 10);
  });

  it('should handle error when saving', (done) => {
    const error = { status: 500, message: 'Internal Server Error' };
    empreendimentoService.criar.and.returnValue(throwError(() => error));

    fixture.detectChanges();

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

    setTimeout(() => {
      expect(notificationService.tratarErroHttp).toHaveBeenCalledWith(
        error,
        'Erro ao salvar empreendimento'
      );
      done();
    }, 10);
  });

  it('should navigate back when voltar is called', () => {
    fixture.detectChanges();

    component.voltar();

    expect(router.navigate).toHaveBeenCalledWith(['/empreendimentos']);
  });

  it('should load empreendimento in edit mode', (done) => {
    activatedRoute.params = of({ id: '1' });
    empreendimentoService.obterPorId.and.returnValue(of(mockEmpreendimento));

    fixture.detectChanges();

    setTimeout(() => {
      expect(component.isEditMode).toBeTruthy();
      expect(component.empreendimentoId).toBe(1);
      expect(component.selectedEmpreendedor).toEqual(mockEmpreendimento.empreendedor);
      expect(component.selectedMunicipio).toEqual(mockEmpreendimento.municipio);
      expect(component.form.get('nomeEmpreendimento')?.value).toBe(mockEmpreendimento.nomeEmpreendimento);
      done();
    }, 10);
  });

  it('should handle error when loading empreendimento in edit mode', (done) => {
    activatedRoute.params = of({ id: '1' });
    const error = { status: 404, message: 'Not Found' };
    empreendimentoService.obterPorId.and.returnValue(throwError(() => error));

    fixture.detectChanges();

    setTimeout(() => {
      expect(notificationService.tratarErroHttp).toHaveBeenCalledWith(
        error,
        'Erro ao carregar empreendimento'
      );
      expect(router.navigate).toHaveBeenCalledWith(['/empreendimentos']);
      done();
    }, 10);
  });

  it('should validate minLength for nomeEmpreendimento', () => {
    fixture.detectChanges();

    const nomeControl = component.form.get('nomeEmpreendimento');
    nomeControl?.setValue('ab');

    expect(nomeControl?.hasError('minlength')).toBeTruthy();

    nomeControl?.setValue('abc');
    expect(nomeControl?.hasError('minlength')).toBeFalsy();
  });

  it('should clear filtered municipios when search term is less than 3 characters', (done) => {
    fixture.detectChanges();

    component.filteredMunicipios = mockMunicipios;

    const municipioControl = component.form.get('municipio');
    municipioControl?.setValue('ab');

    setTimeout(() => {
      expect(component.filteredMunicipios).toEqual([]);
      done();
    }, 100);
  });
});
