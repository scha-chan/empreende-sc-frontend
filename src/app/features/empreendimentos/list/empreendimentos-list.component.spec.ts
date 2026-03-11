import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { EmpreendimentosListComponent } from './empreendimentos-list.component';
import { EmpreendimentoService, NotificationService } from '@app/core/services';
import { Empreendimento } from '@app/core/models';

describe('EmpreendimentosListComponent', () => {
  let component: EmpreendimentosListComponent;
  let fixture: ComponentFixture<EmpreendimentosListComponent>;
  let empreendimentoService: any;
  let notificationService: any;
  let router: any;

  const mockEmpreendimentos: Empreendimento[] = [
    {
      id: 1,
      nomeEmpreendimento: 'Empresa A',
      empreendedor: { id: 1, nome: 'João Silva' },
      municipio: { id: 1, nome: 'Florianópolis', estado: 'SC' },
      segmento: 'TECNOLOGIA',
      email: 'empresa@example.com',
      telefone: '(48) 99999-9999',
      status: true,
    },
  ];

  beforeEach(async () => {
    empreendimentoService = {
      listar: () => of(mockEmpreendimentos),
      obterPorId: () => of(null),
      deletar: () => of(undefined),
    };
    notificationService = {
      tratarErroHttp: () => {},
    };
    router = {
      navigate: () => {},
    };

    await TestBed.configureTestingModule({
      imports: [EmpreendimentosListComponent, NoopAnimationsModule],
      providers: [
        { provide: EmpreendimentoService, useValue: empreendimentoService },
        { provide: NotificationService, useValue: notificationService },
        { provide: Router, useValue: router },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpreendimentosListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have table columns defined', () => {
    expect(component.displayedColumns).toContain('nomeEmpreendimento');
    expect(component.displayedColumns).toContain('acoes');
  });

  it('should have empty empreendimentos array initially', () => {
    expect(component.empreendimentos).toEqual([]);
  });

  it('should call novo() and navigate', () => {
    let navigateCalled = false;
    let navigateArgs: any = null;
    router.navigate = (args: any) => {
      navigateCalled = true;
      navigateArgs = args;
      return Promise.resolve(true);
    };
    component.novo();
    expect(navigateCalled).toBeTruthy();
    expect(navigateArgs).toEqual(['/empreendimentos/novo']);
  });

  it('should call editar() and navigate', () => {
    let navigateCalled = false;
    let navigateArgs: any = null;
    router.navigate = (args: any) => {
      navigateCalled = true;
      navigateArgs = args;
      return Promise.resolve(true);
    };
    component.editar(1);
    expect(navigateCalled).toBeTruthy();
    expect(navigateArgs).toEqual(['/empreendimentos', 1]);
  });

  it('should have correct initial isLoading state', () => {
    expect(component.isLoading).toBeFalsy();
  });
});
