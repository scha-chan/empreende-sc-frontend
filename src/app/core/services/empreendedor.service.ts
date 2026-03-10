import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empreendedor } from '@app/core/models';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class EmpreendedorService extends BaseHttpService<Empreendedor> {
  protected apiUrl = 'http://localhost:3000/api/empreendedores';

  constructor() {
    super(inject(HttpClient));
  }

  override criar(empreendedor: Empreendedor): Observable<Empreendedor> {
    return this.http.post<Empreendedor>(this.apiUrl, empreendedor);
  }
}
