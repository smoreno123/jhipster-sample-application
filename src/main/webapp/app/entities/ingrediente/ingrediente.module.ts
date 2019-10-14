import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { IngredienteComponent } from './ingrediente.component';
import { IngredienteDetailComponent } from './ingrediente-detail.component';
import { IngredienteUpdateComponent } from './ingrediente-update.component';
import { IngredienteDeletePopupComponent, IngredienteDeleteDialogComponent } from './ingrediente-delete-dialog.component';
import { ingredienteRoute, ingredientePopupRoute } from './ingrediente.route';

const ENTITY_STATES = [...ingredienteRoute, ...ingredientePopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    IngredienteComponent,
    IngredienteDetailComponent,
    IngredienteUpdateComponent,
    IngredienteDeleteDialogComponent,
    IngredienteDeletePopupComponent
  ],
  entryComponents: [IngredienteDeleteDialogComponent]
})
export class JhipsterSampleApplicationIngredienteModule {}
