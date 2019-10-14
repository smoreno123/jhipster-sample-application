import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPedido } from 'app/shared/model/pedido.model';
import { AccountService } from 'app/core/auth/account.service';
import { PedidoService } from './pedido.service';

@Component({
  selector: 'jhi-pedido',
  templateUrl: './pedido.component.html'
})
export class PedidoComponent implements OnInit, OnDestroy {
  pedidos: IPedido[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected pedidoService: PedidoService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.pedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPedido[]>) => res.ok),
        map((res: HttpResponse<IPedido[]>) => res.body)
      )
      .subscribe((res: IPedido[]) => {
        this.pedidos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPedido) {
    return item.id;
  }

  registerChangeInPedidos() {
    this.eventSubscriber = this.eventManager.subscribe('pedidoListModification', response => this.loadAll());
  }
}
