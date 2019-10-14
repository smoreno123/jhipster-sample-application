import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PedidoComponent } from './pedido.component';
import { PedidoDetailComponent } from './pedido-detail.component';
import { PedidoUpdateComponent } from './pedido-update.component';
import { PedidoDeletePopupComponent, PedidoDeleteDialogComponent } from './pedido-delete-dialog.component';
import { pedidoRoute, pedidoPopupRoute } from './pedido.route';

const ENTITY_STATES = [...pedidoRoute, ...pedidoPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PedidoComponent, PedidoDetailComponent, PedidoUpdateComponent, PedidoDeleteDialogComponent, PedidoDeletePopupComponent],
  entryComponents: [PedidoDeleteDialogComponent]
})
export class JhipsterSampleApplicationPedidoModule {}
