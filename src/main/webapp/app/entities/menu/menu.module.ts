import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { MenuComponent } from './menu.component';
import { MenuDetailComponent } from './menu-detail.component';
import { MenuUpdateComponent } from './menu-update.component';
import { MenuDeletePopupComponent, MenuDeleteDialogComponent } from './menu-delete-dialog.component';
import { menuRoute, menuPopupRoute } from './menu.route';

const ENTITY_STATES = [...menuRoute, ...menuPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [MenuComponent, MenuDetailComponent, MenuUpdateComponent, MenuDeleteDialogComponent, MenuDeletePopupComponent],
  entryComponents: [MenuDeleteDialogComponent]
})
export class JhipsterSampleApplicationMenuModule {}
