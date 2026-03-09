import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Empreendimento, EmpreendimentoCreate, EmpreendimentoUpdate, PaginatedResponse } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class EmpreendimentoService {
  private apiUrl = 'http://localhost:3000/api/empreendimentos';

  constructor(private http: HttpClient) {}

  listar(): Observable<Empreendimento[]> {
    return this.http.get<PaginatedResponse<Empreendimento>>(this.apiUrl).pipe(
      map(response => response.data)
    );
  }

  obterPorId(id: number): Observable<Empreendimento> {
    return this.http.get<Empreendimento>(`${this.apiUrl}/${id}`);
  }

  criar(empreendimento: EmpreendimentoCreate): Observable<Empreendimento> {
    return this.http.post<Empreendimento>(this.apiUrl, empreendimento);
  }

  atualizar(id: number, empreendimento: EmpreendimentoUpdate): Observable<Empreendimento> {
    return this.http.put<Empreendimento>(`${this.apiUrl}/${id}`, empreendimento);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
