import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from './item-pedido.service';
import { ItemPedidoComponent } from './item-pedido.component';
import { ItemPedidoDetailComponent } from './item-pedido-detail.component';
import { ItemPedidoUpdateComponent } from './item-pedido-update.component';
import { ItemPedidoDeletePopupComponent } from './item-pedido-delete-dialog.component';
import { IItemPedido } from 'app/shared/model/item-pedido.model';

@Injectable({ providedIn: 'root' })
export class ItemPedidoResolve implements Resolve<IItemPedido> {
  constructor(private service: ItemPedidoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IItemPedido> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ItemPedido>) => response.ok),
        map((itemPedido: HttpResponse<ItemPedido>) => itemPedido.body)
      );
    }
    return of(new ItemPedido());
  }
}

export const itemPedidoRoute: Routes = [
  {
    path: '',
    component: ItemPedidoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.itemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ItemPedidoDetailComponent,
    resolve: {
      itemPedido: ItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.itemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ItemPedidoUpdateComponent,
    resolve: {
      itemPedido: ItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.itemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ItemPedidoUpdateComponent,
    resolve: {
      itemPedido: ItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.itemPedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const itemPedidoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ItemPedidoDeletePopupComponent,
    resolve: {
      itemPedido: ItemPedidoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.itemPedido.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
