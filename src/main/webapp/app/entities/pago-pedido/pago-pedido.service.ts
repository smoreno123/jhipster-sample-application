import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPagoPedido } from 'app/shared/model/pago-pedido.model';

type EntityResponseType = HttpResponse<IPagoPedido>;
type EntityArrayResponseType = HttpResponse<IPagoPedido[]>;

@Injectable({ providedIn: 'root' })
export class PagoPedidoService {
  public resourceUrl = SERVER_API_URL + 'api/pago-pedidos';

  constructor(protected http: HttpClient) {}

  create(pagoPedido: IPagoPedido): Observable<EntityResponseType> {
    return this.http.post<IPagoPedido>(this.resourceUrl, pagoPedido, { observe: 'response' });
  }

  update(pagoPedido: IPagoPedido): Observable<EntityResponseType> {
    return this.http.put<IPagoPedido>(this.resourceUrl, pagoPedido, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPagoPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPagoPedido[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
