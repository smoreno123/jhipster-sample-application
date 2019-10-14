import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { PagoPedido } from 'app/shared/model/pago-pedido.model';
import { PagoPedidoService } from './pago-pedido.service';
import { PagoPedidoComponent } from './pago-pedido.component';
import { PagoPedidoDetailComponent } from './pago-pedido-detail.component';
import { PagoPedidoUpdateComponent } from './pago-pedido-update.component';
import { PagoPedidoDeletePopupComponent } from './pago-pedido-delete-dialog.component';
import { IPagoPedido } from 'app/shared/model/pago-pedido.model';

@Injectable({ providedIn: 'root' })
export class PagoPedidoResolve implements Resolve<IPagoPedido> {
  constructor(private service: PagoPedidoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPagoPedido> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<PagoPedido>) => response.ok),
        map((pagoPedido: HttpResponse<PagoPedido>) => pagoPedido.body)
      );
    }
    return of(new PagoPedido());
  }
}

export const pagoPedidoRoute: Routes = [
  {
    path: '',
    component: PagoPedidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pagoPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PagoPedidoDetailComponent,
    resolve: {
      pagoPedido: PagoPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pagoPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PagoPedidoUpdateComponent,
    resolve: {
      pagoPedido: PagoPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pagoPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PagoPedidoUpdateComponent,
    resolve: {
      pagoPedido: PagoPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pagoPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pagoPedidoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PagoPedidoDeletePopupComponent,
    resolve: {
      pagoPedido: PagoPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pagoPedido.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
