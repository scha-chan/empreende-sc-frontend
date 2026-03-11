import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EmpreendimentosListComponent } from './empreendimentos-list.component';
import { EmpreendimentoService, NotificationService } from '@app/core/services';
import { Empreendimento } from '@app/core/models';

describe('EmpreendimentosListComponent', () => {
  let component: EmpreendimentosListComponent;
  let fixture: ComponentFixture<EmpreendimentosListComponent>;
  let empreendimentoService: jasmine.SpyObj<EmpreendimentoService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let router: jasmine.SpyObj<Router>;

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
    {
      id: 2,
      nomeEmpreendimento: 'Empresa B',
      empreendedor: { id: 2, nome: 'Maria Santos' },
      municipio: { id: 2, nome: 'Joinville', estado: 'SC' },
      segmento: 'VAREJO',
      email: 'empresa2@example.com',
      telefone: '(47) 98888-8888',
      status: true,
    },
  ];

  beforeEach(async () => {
    const empreendimentoServiceSpy = jasmine.createSpyObj('EmpreendimentoService', [
      'listar',
      'obterPorId',
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

    await TestBed.configureTestingModule({
      imports: [EmpreendimentosListComponent, BrowserAnimationsModule],
      providers: [
        { provide: EmpreendimentoService, useValue: empreendimentoServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    empreendimentoService = TestBed.inject(EmpreendimentoService) as jasmine.SpyObj<EmpreendimentoService>;
    notificationService = TestBed.inject(NotificationService) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(EmpreendimentosListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load empreendimentos on init', async () => {
    empreendimentoService.listar.and.returnValue(of(mockEmpreendimentos));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(empreendimentoService.listar).toHaveBeenCalled();
    expect(component.empreendimentos).toEqual(mockEmpreendimentos);
    expect(component.isLoading).toBeFalse();
  });

  it('should set isLoading to true while loading empreendimentos', (done) => {
    empreendimentoService.listar.and.returnValue(of(mockEmpreendimentos));

    fixture.detectChanges();

    expect(component.isLoading).toBeTrue();

    setTimeout(() => {
      expect(component.isLoading).toBeFalse();
      done();
    }, 10);
  });

  it('should handle error when loading empreendimentos', async () => {
    const error = { status: 500, statusText: 'Internal Server Error' };
    empreendimentoService.listar.and.returnValue(throwError(() => error));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(notificationService.tratarErroHttp).toHaveBeenCalledWith(
      error,
      'Erro ao carregar empreendimentos'
    );
    expect(component.empreendimentos).toEqual([]);
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate to novo when novo() is called', () => {
    component.novo();

    expect(router.navigate).toHaveBeenCalledWith(['/empreendimentos/novo']);
  });

  it('should navigate to edit when editar() is called', () => {
    const id = 1;
    component.editar(id);

    expect(router.navigate).toHaveBeenCalledWith(['/empreendimentos', id]);
  });

  it('should delete empreendimento when confirmed', async () => {
    empreendimentoService.listar.and.returnValue(of(mockEmpreendimentos));
    empreendimentoService.deletar.and.returnValue(of(undefined));
    spyOn(window, 'confirm').and.returnValue(true);

    fixture.detectChanges();
    await fixture.whenStable();

    component.deletar(1);
    await fixture.whenStable();

    expect(empreendimentoService.deletar).toHaveBeenCalledWith(1);
    expect(empreendimentoService.listar).toHaveBeenCalledTimes(2);
  });

  it('should not delete when user cancels confirm', () => {
    empreendimentoService.listar.and.returnValue(of(mockEmpreendimentos));
    spyOn(window, 'confirm').and.returnValue(false);

    fixture.detectChanges();

    component.deletar(1);

    expect(empreendimentoService.deletar).not.toHaveBeenCalled();
  });

  it('should handle error when deleting empreendimento', async () => {
    empreendimentoService.listar.and.returnValue(of(mockEmpreendimentos));
    const error = { status: 400, statusText: 'Bad Request' };
    empreendimentoService.deletar.and.returnValue(throwError(() => error));
    spyOn(window, 'confirm').and.returnValue(true);

    fixture.detectChanges();
    await fixture.whenStable();

    component.deletar(1);
    await fixture.whenStable();

    expect(notificationService.tratarErroHttp).toHaveBeenCalledWith(
      error,
      'Erro ao deletar empreendimento'
    );
  });

  it('should have correct displayedColumns', () => {
    expect(component.displayedColumns).toEqual([
      'id',
      'nomeEmpreendimento',
      'nomeEmpreendedor',
      'municipio',
      'segmento',
      'status',
      'acoes',
    ]);
  });

  it('should load empty list when no empreendimentos exist', async () => {
    empreendimentoService.listar.and.returnValue(of([]));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(component.empreendimentos).toEqual([]);
  });
});
