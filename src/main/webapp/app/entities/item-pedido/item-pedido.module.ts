import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterSampleApplicationSharedModule } from 'app/shared/shared.module';
import { ItemPedidoComponent } from './item-pedido.component';
import { ItemPedidoDetailComponent } from './item-pedido-detail.component';
import { ItemPedidoUpdateComponent } from './item-pedido-update.component';
import { ItemPedidoDeletePopupComponent, ItemPedidoDeleteDialogComponent } from './item-pedido-delete-dialog.component';
import { itemPedidoRoute, itemPedidoPopupRoute } from './item-pedido.route';

const ENTITY_STATES = [...itemPedidoRoute, ...itemPedidoPopupRoute];

@NgModule({
  imports: [JhipsterSampleApplicationSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ItemPedidoComponent,
    ItemPedidoDetailComponent,
    ItemPedidoUpdateComponent,
    ItemPedidoDeleteDialogComponent,
    ItemPedidoDeletePopupComponent
  ],
  entryComponents: [ItemPedidoDeleteDialogComponent]
})
export class JhipsterSampleApplicationItemPedidoModule {}
