import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { PaginatedResponse } from '@app/core/models';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseHttpService<T> {
  protected abstract apiUrl: string;

  constructor(protected http: HttpClient) {}

  protected extractData(response: any): T[] {
    if (response && response.data && Array.isArray(response.data)) {
      return response.data;
    }
    return Array.isArray(response) ? response : [];
  }

  listar(): Observable<T[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => this.extractData(response))
    );
  }

  obterPorId(id: number): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${id}`);
  }

  criar(dados: any): Observable<T> {
    return this.http.post<T>(this.apiUrl, dados);
  }

  atualizar(id: number, dados: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${id}`, dados);
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
