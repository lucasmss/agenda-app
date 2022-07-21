import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Contato } from '../model/contato';
import {Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) { }

  url: string = environment.apiUrlBase;

  save(contato: Contato) : Observable<Contato> {
    return this.http.post<Contato>(this.url, contato);
  }

}