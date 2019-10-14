import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StatusItemPedido } from 'app/shared/model/status-item-pedido.model';
import { StatusItemPedidoService } from './status-item-pedido.service';
import { StatusItemPedidoComponent } from './status-item-pedido.component';
import { StatusItemPedidoDetailComponent } from './status-item-pedido-detail.component';
import { StatusItemPedidoUpdateComponent } from './status-item-pedido-update.component';
import { StatusItemPedidoDeletePopupComponent } from './status-item-pedido-delete-dialog.component';
import { IStatusItemPedido } from 'app/shared/model/status-item-pedido.model';

@Injectable({ providedIn: 'root' })
export class StatusItemPedidoResolve implements Resolve<IStatusItemPedido> {
  constructor(private service: StatusItemPedidoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IStatusItemPedido> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<StatusItemPedido>) => response.ok),
        map((statusItemPedido: HttpResponse<StatusItemPedido>) => statusItemPedido.body)
      );
    }
    return of(new StatusItemPedido());
  }
}

export const statusItemPedidoRoute: Routes = [
  {
    path: '',
    component: StatusItemPedidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.statusItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StatusItemPedidoDetailComponent,
    resolve: {
      statusItemPedido: StatusItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.statusItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StatusItemPedidoUpdateComponent,
    resolve: {
      statusItemPedido: StatusItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.statusItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StatusItemPedidoUpdateComponent,
    resolve: {
      statusItemPedido: StatusItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.statusItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const statusItemPedidoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: StatusItemPedidoDeletePopupComponent,
    resolve: {
      statusItemPedido: StatusItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.statusItemPedido.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
