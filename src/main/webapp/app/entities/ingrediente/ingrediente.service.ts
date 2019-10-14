import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IIngrediente } from 'app/shared/model/ingrediente.model';

type EntityResponseType = HttpResponse<IIngrediente>;
type EntityArrayResponseType = HttpResponse<IIngrediente[]>;

@Injectable({ providedIn: 'root' })
export class IngredienteService {
  public resourceUrl = SERVER_API_URL + 'api/ingredientes';

  constructor(protected http: HttpClient) {}

  create(ingrediente: IIngrediente): Observable<EntityResponseType> {
    return this.http.post<IIngrediente>(this.resourceUrl, ingrediente, { observe: 'response' });
  }

  update(ingrediente: IIngrediente): Observable<EntityResponseType> {
    return this.http.put<IIngrediente>(this.resourceUrl, ingrediente, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IIngrediente>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IIngrediente[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
