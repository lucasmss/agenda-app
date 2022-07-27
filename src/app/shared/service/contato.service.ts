import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contato } from '../model/contato';
import {Observable} from 'rxjs'
import { PaginaContato } from '../model/pagina.contato.component';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  url: string = environment.apiUrlBase;

  save(contato: Contato) : Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  }

  getListarContatos(page: any, size: any) : Observable<PaginaContato> {
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    return this.http.get<any>(`${this.url}?${params.toString()}`);
  }

  favoritar(contato: Contato) : Observable<Contato> {
    return this.http.patch<Contato>(`${this.url}/${contato.id}/favorito`, null);
  }

  upload(contato: Contato, formData: FormData) : Observable<any> {
    return this.http.put(`${this.url}/${contato.id}/foto`, formData, { responseType : 'blob' });
  }

}
