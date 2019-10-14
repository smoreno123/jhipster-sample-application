import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Pedido } from 'app/shared/model/pedido.model';
import { PedidoService } from './pedido.service';
import { PedidoComponent } from './pedido.component';
import { PedidoDetailComponent } from './pedido-detail.component';
import { PedidoUpdateComponent } from './pedido-update.component';
import { PedidoDeletePopupComponent } from './pedido-delete-dialog.component';
import { IPedido } from 'app/shared/model/pedido.model';

@Injectable({ providedIn: 'root' })
export class PedidoResolve implements Resolve<IPedido> {
  constructor(private service: PedidoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPedido> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Pedido>) => response.ok),
        map((pedido: HttpResponse<Pedido>) => pedido.body)
      );
    }
    return of(new Pedido());
  }
}

export const pedidoRoute: Routes = [
  {
    path: '',
    component: PedidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PedidoDetailComponent,
    resolve: {
      pedido: PedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PedidoUpdateComponent,
    resolve: {
      pedido: PedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PedidoUpdateComponent,
    resolve: {
      pedido: PedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const pedidoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PedidoDeletePopupComponent,
    resolve: {
      pedido: PedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
