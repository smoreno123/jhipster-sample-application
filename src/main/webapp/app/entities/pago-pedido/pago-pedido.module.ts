import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { PagoPedidoComponent } from './pago-pedido.component';
import { PagoPedidoDetailComponent } from './pago-pedido-detail.component';
import { PagoPedidoUpdateComponent } from './pago-pedido-update.component';
import { PagoPedidoDeletePopupComponent, PagoPedidoDeleteDialogComponent } from './pago-pedido-delete-dialog.component';
import { pagoPedidoRoute, pagoPedidoPopupRoute } from './pago-pedido.route';

const ENTITY_STATES = [...pagoPedidoRoute, ...pagoPedidoPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PagoPedidoComponent,
    PagoPedidoDetailComponent,
    PagoPedidoUpdateComponent,
    PagoPedidoDeleteDialogComponent,
    PagoPedidoDeletePopupComponent
  ],
  entryComponents: [PagoPedidoDeleteDialogComponent]
})
export class JhipsterSampleApplicationPagoPedidoModule {}
