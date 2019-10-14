import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoCocina } from 'app/shared/model/tipo-cocina.model';

type EntityResponseType = HttpResponse<ITipoCocina>;
type EntityArrayResponseType = HttpResponse<ITipoCocina[]>;

@Injectable({ providedIn: 'root' })
export class TipoCocinaService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-cocinas';

  constructor(protected http: HttpClient) {}

  create(tipoCocina: ITipoCocina): Observable<EntityResponseType> {
    return this.http.post<ITipoCocina>(this.resourceUrl, tipoCocina, { observe: 'response' });
  }

  update(tipoCocina: ITipoCocina): Observable<EntityResponseType> {
    return this.http.put<ITipoCocina>(this.resourceUrl, tipoCocina, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoCocina>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoCocina[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
