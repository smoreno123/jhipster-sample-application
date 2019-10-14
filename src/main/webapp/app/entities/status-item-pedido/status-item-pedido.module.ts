import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { StatusItemPedidoComponent } from './status-item-pedido.component';
import { StatusItemPedidoDetailComponent } from './status-item-pedido-detail.component';
import { StatusItemPedidoUpdateComponent } from './status-item-pedido-update.component';
import { StatusItemPedidoDeletePopupComponent, StatusItemPedidoDeleteDialogComponent } from './status-item-pedido-delete-dialog.component';
import { statusItemPedidoRoute, statusItemPedidoPopupRoute } from './status-item-pedido.route';

const ENTITY_STATES = [...statusItemPedidoRoute, ...statusItemPedidoPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    StatusItemPedidoComponent,
    StatusItemPedidoDetailComponent,
    StatusItemPedidoUpdateComponent,
    StatusItemPedidoDeleteDialogComponent,
    StatusItemPedidoDeletePopupComponent
  ],
  entryComponents: [StatusItemPedidoDeleteDialogComponent]
})
export class JhipsterSampleApplicationStatusItemPedidoModule {}
