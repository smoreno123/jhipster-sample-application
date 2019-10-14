import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';

@Component({
  selector: 'jhi-tipo-item-pedido-detail',
  templateUrl: './tipo-item-pedido-detail.component.html'
})
export class TipoItemPedidoDetailComponent implements OnInit {
  tipoItemPedido: ITipoItemPedido;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoItemPedido }) => {
      this.tipoItemPedido = tipoItemPedido;
    });
  }

  previousState() {
    window.history.back();
  }
}
