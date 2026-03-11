import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private snackBar = inject(MatSnackBar);

  exibirErro(titulo: string, error: any): void {
    let mensagem = titulo;

    if (error?.error?.message) {
      mensagem = error.error.message;
    } else if (error?.message) {
      mensagem = error.message;
    } else if (typeof error === 'string') {
      mensagem = error;
    }

    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar'],
    });
  }

  tratarErroHttp(error: any, tituloPersonalizado?: string): void {
    let mensagem = tituloPersonalizado || 'Erro ao processar requisição';

    // Verificar se é erro de conexão (status 0) ou erro de rede
    if (!error.status || error.status === 0) {
      mensagem = 'Falha ao buscar os dados do servidor';
    } else if (error?.error?.message) {
      mensagem = error.error.message;
    } else if (error?.message) {
      mensagem = error.message;
    } else if (typeof error === 'string') {
      mensagem = error;
    }

    this.exibirErro(mensagem, error);
  }

  exibirAviso(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['warning-snackbar'],
    });
  }

  exibirSucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['success-snackbar'],
    });
  }
}
