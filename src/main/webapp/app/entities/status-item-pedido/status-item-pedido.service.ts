import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStatusItemPedido } from 'app/shared/model/status-item-pedido.model';

type EntityResponseType = HttpResponse<IStatusItemPedido>;
type EntityArrayResponseType = HttpResponse<IStatusItemPedido[]>;

@Injectable({ providedIn: 'root' })
export class StatusItemPedidoService {
  public resourceUrl = SERVER_API_URL + 'api/status-item-pedidos';

  constructor(protected http: HttpClient) {}

  create(statusItemPedido: IStatusItemPedido): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(statusItemPedido);
    return this.http
      .post<IStatusItemPedido>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(statusItemPedido: IStatusItemPedido): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(statusItemPedido);
    return this.http
      .put<IStatusItemPedido>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IStatusItemPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IStatusItemPedido[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(statusItemPedido: IStatusItemPedido): IStatusItemPedido {
    const copy: IStatusItemPedido = Object.assign({}, statusItemPedido, {
      horaInicio:
        statusItemPedido.horaInicio != null && statusItemPedido.horaInicio.isValid() ? statusItemPedido.horaInicio.toJSON() : null,
      horaFinalizacion:
        statusItemPedido.horaFinalizacion != null && statusItemPedido.horaFinalizacion.isValid()
          ? statusItemPedido.horaFinalizacion.toJSON()
          : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.horaInicio = res.body.horaInicio != null ? moment(res.body.horaInicio) : null;
      res.body.horaFinalizacion = res.body.horaFinalizacion != null ? moment(res.body.horaFinalizacion) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((statusItemPedido: IStatusItemPedido) => {
        statusItemPedido.horaInicio = statusItemPedido.horaInicio != null ? moment(statusItemPedido.horaInicio) : null;
        statusItemPedido.horaFinalizacion = statusItemPedido.horaFinalizacion != null ? moment(statusItemPedido.horaFinalizacion) : null;
      });
    }
    return res;
  }
}
