import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMenu } from 'app/shared/model/menu.model';

type EntityResponseType = HttpResponse<IMenu>;
type EntityArrayResponseType = HttpResponse<IMenu[]>;

@Injectable({ providedIn: 'root' })
export class MenuService {
  public resourceUrl = SERVER_API_URL + 'api/menus';

  constructor(protected http: HttpClient) {}

  create(menu: IMenu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menu);
    return this.http
      .post<IMenu>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(menu: IMenu): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(menu);
    return this.http
      .put<IMenu>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMenu>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMenu[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(menu: IMenu): IMenu {
    const copy: IMenu = Object.assign({}, menu, {
      fechaInicio: menu.fechaInicio != null && menu.fechaInicio.isValid() ? menu.fechaInicio.toJSON() : null,
      fechaFinal: menu.fechaFinal != null && menu.fechaFinal.isValid() ? menu.fechaFinal.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fechaInicio = res.body.fechaInicio != null ? moment(res.body.fechaInicio) : null;
      res.body.fechaFinal = res.body.fechaFinal != null ? moment(res.body.fechaFinal) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((menu: IMenu) => {
        menu.fechaInicio = menu.fechaInicio != null ? moment(menu.fechaInicio) : null;
        menu.fechaFinal = menu.fechaFinal != null ? moment(menu.fechaFinal) : null;
      });
    }
    return res;
  }
}
