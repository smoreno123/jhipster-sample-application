import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Comensal } from 'app/shared/model/comensal.model';
import { ComensalService } from './comensal.service';
import { ComensalComponent } from './comensal.component';
import { ComensalDetailComponent } from './comensal-detail.component';
import { ComensalUpdateComponent } from './comensal-update.component';
import { ComensalDeletePopupComponent } from './comensal-delete-dialog.component';
import { IComensal } from 'app/shared/model/comensal.model';

@Injectable({ providedIn: 'root' })
export class ComensalResolve implements Resolve<IComensal> {
  constructor(private service: ComensalService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IComensal> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Comensal>) => response.ok),
        map((comensal: HttpResponse<Comensal>) => comensal.body)
      );
    }
    return of(new Comensal());
  }
}

export const comensalRoute: Routes = [
  {
    path: '',
    component: ComensalComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.comensal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ComensalDetailComponent,
    resolve: {
      comensal: ComensalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.comensal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ComensalUpdateComponent,
    resolve: {
      comensal: ComensalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.comensal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ComensalUpdateComponent,
    resolve: {
      comensal: ComensalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.comensal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const comensalPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ComensalDeletePopupComponent,
    resolve: {
      comensal: ComensalResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.comensal.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
