import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Empreendedor } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class EmpreendedorService {
  private apiUrl = 'http://localhost:3000/api/empreendedores';

  constructor(private http: HttpClient) {}

  private extrairDados(response: any): Empreendedor[] {
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return Array.isArray(response) ? response : [];
  }

  listar(): Observable<Empreendedor[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => this.extrairDados(response))
    );
  }

  obterPorId(id: number): Observable<Empreendedor> {
    return this.http.get<Empreendedor>(`${this.apiUrl}/${id}`);
  }

  criar(empreendedor: Empreendedor): Observable<Empreendedor> {
    return this.http.post<Empreendedor>(this.apiUrl, empreendedor);
  }

  atualizar(id: number, empreendedor: Empreendedor): Observable<Empreendedor> {
    return this.http.put<Empreendedor>(`${this.apiUrl}/${id}`, empreendedor);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
