import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Mesa } from 'app/shared/model/mesa.model';
import { MesaService } from './mesa.service';
import { MesaComponent } from './mesa.component';
import { MesaDetailComponent } from './mesa-detail.component';
import { MesaUpdateComponent } from './mesa-update.component';
import { MesaDeletePopupComponent } from './mesa-delete-dialog.component';
import { IMesa } from 'app/shared/model/mesa.model';

@Injectable({ providedIn: 'root' })
export class MesaResolve implements Resolve<IMesa> {
  constructor(private service: MesaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IMesa> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Mesa>) => response.ok),
        map((mesa: HttpResponse<Mesa>) => mesa.body)
      );
    }
    return of(new Mesa());
  }
}

export const mesaRoute: Routes = [
  {
    path: '',
    component: MesaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.mesa.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: MesaDetailComponent,
    resolve: {
      mesa: MesaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.mesa.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: MesaUpdateComponent,
    resolve: {
      mesa: MesaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.mesa.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: MesaUpdateComponent,
    resolve: {
      mesa: MesaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.mesa.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const mesaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: MesaDeletePopupComponent,
    resolve: {
      mesa: MesaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.mesa.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
