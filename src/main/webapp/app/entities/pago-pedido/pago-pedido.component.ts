import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPagoPedido } from 'app/shared/model/pago-pedido.model';
import { AccountService } from 'app/core/auth/account.service';
import { PagoPedidoService } from './pago-pedido.service';

@Component({
  selector: 'jhi-pago-pedido',
  templateUrl: './pago-pedido.component.html'
})
export class PagoPedidoComponent implements OnInit, OnDestroy {
  pagoPedidos: IPagoPedido[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected pagoPedidoService: PagoPedidoService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.pagoPedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IPagoPedido[]>) => res.ok),
        map((res: HttpResponse<IPagoPedido[]>) => res.body)
      )
      .subscribe((res: IPagoPedido[]) => {
        this.pagoPedidos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPagoPedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPagoPedido) {
    return item.id;
  }

  registerChangeInPagoPedidos() {
    this.eventSubscriber = this.eventManager.subscribe('pagoPedidoListModification', response => this.loadAll());
  }
}
