import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IValoracion } from 'app/shared/model/valoracion.model';

type EntityResponseType = HttpResponse<IValoracion>;
type EntityArrayResponseType = HttpResponse<IValoracion[]>;

@Injectable({ providedIn: 'root' })
export class ValoracionService {
  public resourceUrl = SERVER_API_URL + 'api/valoracions';

  constructor(protected http: HttpClient) {}

  create(valoracion: IValoracion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(valoracion);
    return this.http
      .post<IValoracion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(valoracion: IValoracion): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(valoracion);
    return this.http
      .put<IValoracion>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IValoracion>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IValoracion[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(valoracion: IValoracion): IValoracion {
    const copy: IValoracion = Object.assign({}, valoracion, {
      fecha: valoracion.fecha != null && valoracion.fecha.isValid() ? valoracion.fecha.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha != null ? moment(res.body.fecha) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((valoracion: IValoracion) => {
        valoracion.fecha = valoracion.fecha != null ? moment(valoracion.fecha) : null;
      });
    }
    return res;
  }
}
