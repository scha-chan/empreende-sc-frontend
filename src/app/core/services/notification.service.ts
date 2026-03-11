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
}
