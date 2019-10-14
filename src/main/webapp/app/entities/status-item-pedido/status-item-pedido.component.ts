import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IStatusItemPedido } from 'app/shared/model/status-item-pedido.model';
import { AccountService } from 'app/core/auth/account.service';
import { StatusItemPedidoService } from './status-item-pedido.service';

@Component({
  selector: 'jhi-status-item-pedido',
  templateUrl: './status-item-pedido.component.html'
})
export class StatusItemPedidoComponent implements OnInit, OnDestroy {
  statusItemPedidos: IStatusItemPedido[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected statusItemPedidoService: StatusItemPedidoService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.statusItemPedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IStatusItemPedido[]>) => res.ok),
        map((res: HttpResponse<IStatusItemPedido[]>) => res.body)
      )
      .subscribe((res: IStatusItemPedido[]) => {
        this.statusItemPedidos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInStatusItemPedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IStatusItemPedido) {
    return item.id;
  }

  registerChangeInStatusItemPedidos() {
    this.eventSubscriber = this.eventManager.subscribe('statusItemPedidoListModification', response => this.loadAll());
  }
}
