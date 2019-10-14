import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { TipoCocinaComponent } from './tipo-cocina.component';
import { TipoCocinaDetailComponent } from './tipo-cocina-detail.component';
import { TipoCocinaUpdateComponent } from './tipo-cocina-update.component';
import { TipoCocinaDeletePopupComponent, TipoCocinaDeleteDialogComponent } from './tipo-cocina-delete-dialog.component';
import { tipoCocinaRoute, tipoCocinaPopupRoute } from './tipo-cocina.route';

const ENTITY_STATES = [...tipoCocinaRoute, ...tipoCocinaPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoCocinaComponent,
    TipoCocinaDetailComponent,
    TipoCocinaUpdateComponent,
    TipoCocinaDeleteDialogComponent,
    TipoCocinaDeletePopupComponent
  ],
  entryComponents: [TipoCocinaDeleteDialogComponent]
})
export class JhipsterSampleApplicationTipoCocinaModule {}
