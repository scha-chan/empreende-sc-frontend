import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Municipio } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService {
  private apiUrl = 'http://localhost:3000/api/municipios';

  constructor(private http: HttpClient) {}

  private extrairDados(response: any): Municipio[] {
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return Array.isArray(response) ? response : [];
  }

  listar(): Observable<Municipio[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => this.extrairDados(response))
    );
  }

  buscar(termo: string): Observable<Municipio[]> {
    return this.http.get<any>(`${this.apiUrl}?nome=${termo}`).pipe(
      map((response) => this.extrairDados(response))
    );
  }

  obterPorId(id: number): Observable<Municipio> {
    return this.http.get<Municipio>(`${this.apiUrl}/${id}`);
  }

  criar(municipio: Municipio): Observable<Municipio> {
    return this.http.post<Municipio>(this.apiUrl, municipio);
  }

  atualizar(id: number, municipio: Municipio): Observable<Municipio> {
    return this.http.put<Municipio>(`${this.apiUrl}/${id}`, municipio);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
