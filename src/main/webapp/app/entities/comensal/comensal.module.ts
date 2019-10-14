import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ComensalComponent } from './comensal.component';
import { ComensalDetailComponent } from './comensal-detail.component';
import { ComensalUpdateComponent } from './comensal-update.component';
import { ComensalDeletePopupComponent, ComensalDeleteDialogComponent } from './comensal-delete-dialog.component';
import { comensalRoute, comensalPopupRoute } from './comensal.route';

const ENTITY_STATES = [...comensalRoute, ...comensalPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ComensalComponent,
    ComensalDetailComponent,
    ComensalUpdateComponent,
    ComensalDeleteDialogComponent,
    ComensalDeletePopupComponent
  ],
  entryComponents: [ComensalDeleteDialogComponent]
})
export class JhipsterSampleApplicationComensalModule {}
