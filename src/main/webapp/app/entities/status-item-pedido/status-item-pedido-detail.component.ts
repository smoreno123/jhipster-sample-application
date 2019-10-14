import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStatusItemPedido } from 'app/shared/model/status-item-pedido.model';

@Component({
  selector: 'jhi-status-item-pedido-detail',
  templateUrl: './status-item-pedido-detail.component.html'
})
export class StatusItemPedidoDetailComponent implements OnInit {
  statusItemPedido: IStatusItemPedido;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ statusItemPedido }) => {
      this.statusItemPedido = statusItemPedido;
    });
  }

  previousState() {
    window.history.back();
  }
}
