import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneMask',
  standalone: true,
})
export class PhoneMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // Remove tudo que não é número
    const cleaned = value.replace(/\D/g, '');

    // Limita a 11 dígitos (DDD + 9 dígitos de celular)
    const limited = cleaned.slice(0, 11);

    // Formata: (XX) XXXXX-XXXX (11 dígitos, celular) ou (XX) XXXX-XXXX (10 dígitos, linha fixa)
    if (limited.length === 0) return '';
    if (limited.length <= 2) return `(${limited}`;
    if (limited.length <= 7) return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    if (limited.length === 10) {
      // Linha fixa: (XX) XXXX-XXXX
      return `(${limited.slice(0, 2)}) ${limited.slice(2, 6)}-${limited.slice(6)}`;
    }
    // Celular: (XX) XXXXX-XXXX
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
  }
}
