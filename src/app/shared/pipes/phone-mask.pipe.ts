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

    // Formata: (XX) 9XXXX-XXXX ou (XX) XXXX-XXXX
    if (limited.length === 0) return '';
    if (limited.length <= 2) return `(${limited}`;
    if (limited.length <= 7) return `(${limited.slice(0, 2)}) ${limited.slice(2)}`;
    return `(${limited.slice(0, 2)}) ${limited.slice(2, 7)}-${limited.slice(7)}`;
  }
}
