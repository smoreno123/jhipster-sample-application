import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ValoracionComponent } from './valoracion.component';
import { ValoracionDetailComponent } from './valoracion-detail.component';
import { ValoracionUpdateComponent } from './valoracion-update.component';
import { ValoracionDeletePopupComponent, ValoracionDeleteDialogComponent } from './valoracion-delete-dialog.component';
import { valoracionRoute, valoracionPopupRoute } from './valoracion.route';

const ENTITY_STATES = [...valoracionRoute, ...valoracionPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ValoracionComponent,
    ValoracionDetailComponent,
    ValoracionUpdateComponent,
    ValoracionDeleteDialogComponent,
    ValoracionDeletePopupComponent
  ],
  entryComponents: [ValoracionDeleteDialogComponent]
})
export class JhipsterSampleApplicationValoracionModule {}
