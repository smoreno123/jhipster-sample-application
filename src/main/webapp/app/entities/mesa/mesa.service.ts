import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMesa } from 'app/shared/model/mesa.model';

type EntityResponseType = HttpResponse<IMesa>;
type EntityArrayResponseType = HttpResponse<IMesa[]>;

@Injectable({ providedIn: 'root' })
export class MesaService {
  public resourceUrl = SERVER_API_URL + 'api/mesas';

  constructor(protected http: HttpClient) {}

  create(mesa: IMesa): Observable<EntityResponseType> {
    return this.http.post<IMesa>(this.resourceUrl, mesa, { observe: 'response' });
  }

  update(mesa: IMesa): Observable<EntityResponseType> {
    return this.http.put<IMesa>(this.resourceUrl, mesa, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMesa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMesa[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
