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
    console.log('extrairDados - Resposta completa:', response);
    if (response && response.data && Array.isArray(response.data)) {
      console.log('extrairDados - Dados extraídos:', response.data);
      return response.data;
    }
    console.log('extrairDados - Nenhum dado encontrado', response);
    return Array.isArray(response) ? response : [];
  }

  listar(): Observable<Municipio[]> {
    console.log('listar() chamado');
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => this.extrairDados(response))
    );
  }

  buscar(termo: string): Observable<Municipio[]> {
    console.log('buscar() chamado com termo:', termo);
    return this.http.get<any>(`${this.apiUrl}?nome=${termo}`).pipe(
      map((response) => {
        console.log('buscar() - Response da API:', response);
        return this.extrairDados(response);
      })
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
