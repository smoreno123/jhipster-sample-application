import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';
import { TipoItemPedidoService } from './tipo-item-pedido.service';
import { TipoItemPedidoComponent } from './tipo-item-pedido.component';
import { TipoItemPedidoDetailComponent } from './tipo-item-pedido-detail.component';
import { TipoItemPedidoUpdateComponent } from './tipo-item-pedido-update.component';
import { TipoItemPedidoDeletePopupComponent } from './tipo-item-pedido-delete-dialog.component';
import { ITipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';

@Injectable({ providedIn: 'root' })
export class TipoItemPedidoResolve implements Resolve<ITipoItemPedido> {
  constructor(private service: TipoItemPedidoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoItemPedido> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoItemPedido>) => response.ok),
        map((tipoItemPedido: HttpResponse<TipoItemPedido>) => tipoItemPedido.body)
      );
    }
    return of(new TipoItemPedido());
  }
}

export const tipoItemPedidoRoute: Routes = [
  {
    path: '',
    component: TipoItemPedidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoItemPedidoDetailComponent,
    resolve: {
      tipoItemPedido: TipoItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoItemPedidoUpdateComponent,
    resolve: {
      tipoItemPedido: TipoItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoItemPedidoUpdateComponent,
    resolve: {
      tipoItemPedido: TipoItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoItemPedidoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoItemPedidoDeletePopupComponent,
    resolve: {
      tipoItemPedido: TipoItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
