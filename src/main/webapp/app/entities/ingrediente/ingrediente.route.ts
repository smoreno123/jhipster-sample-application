import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ingrediente } from 'app/shared/model/ingrediente.model';
import { IngredienteService } from './ingrediente.service';
import { IngredienteComponent } from './ingrediente.component';
import { IngredienteDetailComponent } from './ingrediente-detail.component';
import { IngredienteUpdateComponent } from './ingrediente-update.component';
import { IngredienteDeletePopupComponent } from './ingrediente-delete-dialog.component';
import { IIngrediente } from 'app/shared/model/ingrediente.model';

@Injectable({ providedIn: 'root' })
export class IngredienteResolve implements Resolve<IIngrediente> {
  constructor(private service: IngredienteService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IIngrediente> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Ingrediente>) => response.ok),
        map((ingrediente: HttpResponse<Ingrediente>) => ingrediente.body)
      );
    }
    return of(new Ingrediente());
  }
}

export const ingredienteRoute: Routes = [
  {
    path: '',
    component: IngredienteComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.ingrediente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IngredienteDetailComponent,
    resolve: {
      ingrediente: IngredienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.ingrediente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IngredienteUpdateComponent,
    resolve: {
      ingrediente: IngredienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.ingrediente.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IngredienteUpdateComponent,
    resolve: {
      ingrediente: IngredienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.ingrediente.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const ingredientePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: IngredienteDeletePopupComponent,
    resolve: {
      ingrediente: IngredienteResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterSampleApplicationApp.ingrediente.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
