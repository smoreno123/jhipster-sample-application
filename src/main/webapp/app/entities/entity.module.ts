import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'item-pedido',
        loadChildren: () => import('./item-pedido/item-pedido.module').then(m => m.JhipsterSampleApplicationItemPedidoModule)
      },
      {
        path: 'pedido',
        loadChildren: () => import('./pedido/pedido.module').then(m => m.JhipsterSampleApplicationPedidoModule)
      },
      {
        path: 'ingrediente',
        loadChildren: () => import('./ingrediente/ingrediente.module').then(m => m.JhipsterSampleApplicationIngredienteModule)
      },
      {
        path: 'mesa',
        loadChildren: () => import('./mesa/mesa.module').then(m => m.JhipsterSampleApplicationMesaModule)
      },
      {
        path: 'valoracion',
        loadChildren: () => import('./valoracion/valoracion.module').then(m => m.JhipsterSampleApplicationValoracionModule)
      },
      {
        path: 'tipo-cocina',
        loadChildren: () => import('./tipo-cocina/tipo-cocina.module').then(m => m.JhipsterSampleApplicationTipoCocinaModule)
      },
      {
        path: 'pago-pedido',
        loadChildren: () => import('./pago-pedido/pago-pedido.module').then(m => m.JhipsterSampleApplicationPagoPedidoModule)
      },
      {
        path: 'tipo-item-pedido',
        loadChildren: () => import('./tipo-item-pedido/tipo-item-pedido.module').then(m => m.JhipsterSampleApplicationTipoItemPedidoModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./menu/menu.module').then(m => m.JhipsterSampleApplicationMenuModule)
      },
      {
        path: 'status-item-pedido',
        loadChildren: () =>
          import('./status-item-pedido/status-item-pedido.module').then(m => m.JhipsterSampleApplicationStatusItemPedidoModule)
      },
      {
        path: 'comensal',
        loadChildren: () => import('./comensal/comensal.module').then(m => m.JhipsterSampleApplicationComensalModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterSampleApplicationEntityModule {}
