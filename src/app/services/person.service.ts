import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPerson } from '../interfaces/person.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private _api: string = `${environment.apiPerson}`;
  private _http = inject(HttpClient);

  constructor() { }


  getPersonByNumeroDocumento(numeroDocumento: string): Observable<IPerson> {
    return this._http.get<IPerson>(
      `${this._api}/persona/${numeroDocumento}`
    );
  }
}
