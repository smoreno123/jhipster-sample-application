import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoCocina } from 'app/shared/model/tipo-cocina.model';
import { TipoCocinaService } from './tipo-cocina.service';
import { TipoCocinaComponent } from './tipo-cocina.component';
import { TipoCocinaDetailComponent } from './tipo-cocina-detail.component';
import { TipoCocinaUpdateComponent } from './tipo-cocina-update.component';
import { TipoCocinaDeletePopupComponent } from './tipo-cocina-delete-dialog.component';
import { ITipoCocina } from 'app/shared/model/tipo-cocina.model';

@Injectable({ providedIn: 'root' })
export class TipoCocinaResolve implements Resolve<ITipoCocina> {
  constructor(private service: TipoCocinaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoCocina> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoCocina>) => response.ok),
        map((tipoCocina: HttpResponse<TipoCocina>) => tipoCocina.body)
      );
    }
    return of(new TipoCocina());
  }
}

export const tipoCocinaRoute: Routes = [
  {
    path: '',
    component: TipoCocinaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoCocina.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoCocinaDetailComponent,
    resolve: {
      tipoCocina: TipoCocinaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoCocina.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoCocinaUpdateComponent,
    resolve: {
      tipoCocina: TipoCocinaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoCocina.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoCocinaUpdateComponent,
    resolve: {
      tipoCocina: TipoCocinaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoCocina.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoCocinaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoCocinaDeletePopupComponent,
    resolve: {
      tipoCocina: TipoCocinaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.tipoCocina.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
