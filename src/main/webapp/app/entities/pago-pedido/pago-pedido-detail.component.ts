import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPagoPedido } from 'app/shared/model/pago-pedido.model';

@Component({
  selector: 'jhi-pago-pedido-detail',
  templateUrl: './pago-pedido-detail.component.html'
})
export class PagoPedidoDetailComponent implements OnInit {
  pagoPedido: IPagoPedido;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pagoPedido }) => {
      this.pagoPedido = pagoPedido;
    });
  }

  previousState() {
    window.history.back();
  }
}
