import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';

type EntityResponseType = HttpResponse<ITipoItemPedido>;
type EntityArrayResponseType = HttpResponse<ITipoItemPedido[]>;

@Injectable({ providedIn: 'root' })
export class TipoItemPedidoService {
  public resourceUrl = SERVER_API_URL + 'api/tipo-item-pedidos';

  constructor(protected http: HttpClient) {}

  create(tipoItemPedido: ITipoItemPedido): Observable<EntityResponseType> {
    return this.http.post<ITipoItemPedido>(this.resourceUrl, tipoItemPedido, { observe: 'response' });
  }

  update(tipoItemPedido: ITipoItemPedido): Observable<EntityResponseType> {
    return this.http.put<ITipoItemPedido>(this.resourceUrl, tipoItemPedido, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ITipoItemPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ITipoItemPedido[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
