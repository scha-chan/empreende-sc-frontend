import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Municipio } from '@app/core/models';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class MunicipioService extends BaseHttpService<Municipio> {
  protected apiUrl = 'http://localhost:3000/api/municipios';

  constructor() {
    super(inject(HttpClient));
  }

  buscar(termo: string): Observable<Municipio[]> {
    return this.http.get<any>(`${this.apiUrl}?nome=${termo}`).pipe(
      map((response) => {
        return this.extractData(response);
      })
    );
  }
}
