import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empreendimento, EmpreendimentoCreate, EmpreendimentoUpdate } from '@app/core/models';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class EmpreendimentoService extends BaseHttpService<Empreendimento> {
  protected apiUrl = 'http://localhost:3000/api/empreendimentos';

  constructor() {
    super(inject(HttpClient));
  }

  override criar(empreendimento: EmpreendimentoCreate): Observable<Empreendimento> {
    return this.http.post<Empreendimento>(this.apiUrl, empreendimento);
  }

  override atualizar(id: number, empreendimento: EmpreendimentoUpdate): Observable<Empreendimento> {
    return this.http.put<Empreendimento>(`${this.apiUrl}/${id}`, empreendimento);
  }
}
