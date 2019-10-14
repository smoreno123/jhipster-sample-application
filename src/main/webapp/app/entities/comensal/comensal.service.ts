import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IComensal } from 'app/shared/model/comensal.model';

type EntityResponseType = HttpResponse<IComensal>;
type EntityArrayResponseType = HttpResponse<IComensal[]>;

@Injectable({ providedIn: 'root' })
export class ComensalService {
  public resourceUrl = SERVER_API_URL + 'api/comensals';

  constructor(protected http: HttpClient) {}

  create(comensal: IComensal): Observable<EntityResponseType> {
    return this.http.post<IComensal>(this.resourceUrl, comensal, { observe: 'response' });
  }

  update(comensal: IComensal): Observable<EntityResponseType> {
    return this.http.put<IComensal>(this.resourceUrl, comensal, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IComensal>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IComensal[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
