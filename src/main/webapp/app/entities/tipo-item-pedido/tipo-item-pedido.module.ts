import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { TipoItemPedidoComponent } from './tipo-item-pedido.component';
import { TipoItemPedidoDetailComponent } from './tipo-item-pedido-detail.component';
import { TipoItemPedidoUpdateComponent } from './tipo-item-pedido-update.component';
import { TipoItemPedidoDeletePopupComponent, TipoItemPedidoDeleteDialogComponent } from './tipo-item-pedido-delete-dialog.component';
import { tipoItemPedidoRoute, tipoItemPedidoPopupRoute } from './tipo-item-pedido.route';

const ENTITY_STATES = [...tipoItemPedidoRoute, ...tipoItemPedidoPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoItemPedidoComponent,
    TipoItemPedidoDetailComponent,
    TipoItemPedidoUpdateComponent,
    TipoItemPedidoDeleteDialogComponent,
    TipoItemPedidoDeletePopupComponent
  ],
  entryComponents: [TipoItemPedidoDeleteDialogComponent]
})
export class JhipsterSampleApplicationTipoItemPedidoModule {}
