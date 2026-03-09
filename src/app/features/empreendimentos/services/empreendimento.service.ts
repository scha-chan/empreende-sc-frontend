import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Empreendimento } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class EmpreendimentoService {
  private apiUrl = 'http://localhost:3000/api/empreendimentos';

  constructor(private http: HttpClient) {}

  private extrairDados(response: any): Empreendimento[] {
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return Array.isArray(response) ? response : [];
  }

  listar(): Observable<Empreendimento[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => this.extrairDados(response))
    );
  }

  obterPorId(id: number): Observable<Empreendimento> {
    return this.http.get<Empreendimento>(`${this.apiUrl}/${id}`);
  }

  criar(empreendimento: Empreendimento): Observable<Empreendimento> {
    return this.http.post<Empreendimento>(this.apiUrl, empreendimento);
  }

  atualizar(id: number, empreendimento: Empreendimento): Observable<Empreendimento> {
    return this.http.put<Empreendimento>(`${this.apiUrl}/${id}`, empreendimento);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
