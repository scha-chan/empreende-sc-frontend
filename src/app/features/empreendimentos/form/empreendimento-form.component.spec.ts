import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { EmpreendimentoFormComponent } from './empreendimento-form.component';
import {
  EmpreendimentoService,
  EmpreendedorService,
  MunicipioService,
  NotificationService,
} from '@app/core/services';
import { Empreendedor, Municipio } from '@app/core/models';
import { BreakpointObserver } from '@angular/cdk/layout';

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
  ];

  const mockMunicipios: Municipio[] = [
    { id: 1, nome: 'Florianópolis', estado: 'SC' },
    { id: 2, nome: 'Joinville', estado: 'SC' },
  ];

  beforeEach(async () => {
    empreendimentoService = {
      listar: () => of([]),
      obterPorId: () => of(null),
      criar: () => of(null),
      atualizar: () => of(null),
    };
    empreendedorService = {
      listar: () => of(mockEmpreendedores),
      criar: () => of(null),
    };
    municipioService = {
      buscar: () => of(mockMunicipios),
    };
    notificationService = {
      exibirSucesso: () => {},
      exibirErro: () => {},
      tratarErroHttp: () => {},
    };
    router = {
      navigate: () => {},
    };
    activatedRoute = {
      params: of({}),
    };
    breakpointObserver = {
      observe: () => of({ matches: false, breakpoints: {} }),
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

    fixture = TestBed.createComponent(EmpreendimentoFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.form).toBeDefined();
    expect(component.form.get('nomeEmpreendimento')?.value).toBe('');
    expect(component.form.get('status')?.value).toBe(true);
  });

  it('should load empreendedores on init', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.empreendedores.length).toBeGreaterThan(0);
  });

  it('should validate required nomeEmpreendimento', () => {
    fixture.detectChanges();

    const control = component.form.get('nomeEmpreendimento');
    control?.setValue('');
    expect(control?.hasError('required')).toBeTruthy();

    control?.setValue('Empresa Teste');
    expect(control?.hasError('required')).toBeFalsy();
  });

  it('should validate minLength for nomeEmpreendimento', () => {
    fixture.detectChanges();

    const control = component.form.get('nomeEmpreendimento');
    control?.setValue('ab');
    expect(control?.hasError('minlength')).toBeTruthy();

    control?.setValue('abc');
    expect(control?.hasError('minlength')).toBeFalsy();
  });

  it('should validate email format', () => {
    fixture.detectChanges();

    const control = component.form.get('email');
    control?.setValue('invalid');
    expect(control?.hasError('email')).toBeTruthy();

    control?.setValue('valid@example.com');
    expect(control?.hasError('email')).toBeFalsy();

    control?.setValue('');
    expect(control?.hasError('email')).toBeFalsy();
  });

  it('should validate phone format', () => {
    fixture.detectChanges();

    const control = component.form.get('telefone');

    control?.setValue('invalid');
    expect(control?.hasError('pattern')).toBeTruthy();

    control?.setValue('(48) 99999-9999');
    expect(control?.hasError('pattern')).toBeFalsy();

    control?.setValue('');
    expect(control?.hasError('pattern')).toBeFalsy();
  });

  it('should require at least one contact', () => {
    fixture.detectChanges();

    component.form.patchValue({
      nomeEmpreendimento: 'Test',
      nomeEmpreendedor: 'Test',
      municipio: 'Test',
      segmento: 'TECNOLOGIA',
      email: '',
      telefone: '',
    });

    expect(component.form.hasError('atLeastOneContact')).toBeTruthy();

    component.form.patchValue({ email: 'test@example.com' });
    expect(component.form.hasError('atLeastOneContact')).toBeFalsy();
  });

  it('should select empreendedor', () => {
    fixture.detectChanges();

    component.selecionarEmpreendedor(mockEmpreendedores[0]);
    expect(component.selectedEmpreendedor).toEqual(mockEmpreendedores[0]);
  });

  it('should select municipio', () => {
    fixture.detectChanges();

    component.selecionarMunicipio(mockMunicipios[0]);
    expect(component.selectedMunicipio).toEqual(mockMunicipios[0]);
  });

  it('should navigate back on voltar', () => {
    let navigateCalled = false;
    let navigateArgs: any = null;
    router.navigate = (args: any) => {
      navigateCalled = true;
      navigateArgs = args;
      return Promise.resolve(true);
    };
    fixture.detectChanges();

    component.voltar();
    expect(navigateCalled).toBeTruthy();
    expect(navigateArgs).toEqual(['/empreendimentos']);
  });

  it('should have isEditMode set to false initially', async () => {
    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.isEditMode).toBeFalsy();
  });

  it('should have correct gridCols initial value', () => {
    expect(component.gridCols).toBe(4);
  });
});

