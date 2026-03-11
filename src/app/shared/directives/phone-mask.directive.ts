import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appPhoneMask]',
  standalone: true,
})
export class PhoneMaskDirective {
  private ngControl = inject(NgControl);
  private el = inject(ElementRef);

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    // Remove tudo que não é número
    const cleaned = value.replace(/\D/g, '');

    // Limita a 11 dígitos (DDD + 9 dígitos de celular)
    const limited = cleaned.slice(0, 11);

    // Formata: (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX
    let formatted = '';
    if (limited.length === 0) {
      formatted = '';
    } else if (limited.length <= 2) {
      formatted = `(${limited}`;
    } else if (limited.length <= 7) {
      formatted = `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    } else {
      formatted = `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
    }

    // Atualiza o input
    input.value = formatted;

    // Atualiza o control do formulário
    if (this.ngControl?.control) {
      this.ngControl.control.setValue(formatted, { emitEvent: false });
    }
  }
}
