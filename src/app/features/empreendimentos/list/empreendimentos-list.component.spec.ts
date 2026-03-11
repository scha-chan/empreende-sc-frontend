import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { describe, it, expect, beforeEach, vi } from 'vitest';

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
    empreendimentoService = {
      listar: vi.fn(),
      obterPorId: vi.fn(),
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

  it('should load empreendimentos on init', async () => {
    empreendimentoService.listar.mockReturnValue(of(mockEmpreendimentos));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(empreendimentoService.listar).toHaveBeenCalled();
    expect(component.empreendimentos).toEqual(mockEmpreendimentos);
    expect(component.isLoading).toBeFalsy();
  });

  it('should handle error when loading empreendimentos', async () => {
    const error = { status: 500, statusText: 'Internal Server Error' };
    empreendimentoService.listar.mockReturnValue(throwError(() => error));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(notificationService.tratarErroHttp).toHaveBeenCalledWith(
      error,
      'Erro ao carregar empreendimentos'
    );
    expect(component.empreendimentos).toEqual([]);
    expect(component.isLoading).toBeFalsy();
  });

  it('should navigate to novo when novo() is called', () => {
    fixture.detectChanges();
    component.novo();

    expect(router.navigate).toHaveBeenCalledWith(['/empreendimentos/novo']);
  });

  it('should navigate to edit when editar() is called', () => {
    fixture.detectChanges();
    const id = 1;
    component.editar(id);

    expect(router.navigate).toHaveBeenCalledWith(['/empreendimentos', id]);
  });

  it('should delete empreendimento when confirmed', async () => {
    empreendimentoService.listar.mockReturnValue(of(mockEmpreendimentos));
    empreendimentoService.deletar.mockReturnValue(of(undefined));
    vi.spyOn(window, 'confirm').mockReturnValue(true);

    fixture.detectChanges();
    await fixture.whenStable();

    component.deletar(1);
    await fixture.whenStable();

    expect(empreendimentoService.deletar).toHaveBeenCalledWith(1);
  });

  it('should not delete when user cancels confirm', async () => {
    empreendimentoService.listar.mockReturnValue(of(mockEmpreendimentos));
    vi.spyOn(window, 'confirm').mockReturnValue(false);

    fixture.detectChanges();

    component.deletar(1);

    expect(empreendimentoService.deletar).not.toHaveBeenCalled();
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
});
