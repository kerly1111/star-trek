import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactorVO } from '../interface/request/reactor-vo';
import { InjectorResultResponseVO } from '../interface/response/injector-result-response-vo';

@Injectable()
export class PowerManagementService {

  private HttpHeaders = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(private httpClient: HttpClient) {}

  calculate = (request: ReactorVO) : Observable<InjectorResultResponseVO> =>
    this.httpClient.post<InjectorResultResponseVO>('/api/calculate', JSON.stringify(request), {headers: this.HttpHeaders});
}
