import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { AccountService } from 'app/core/auth/account.service';
import { ItemPedidoService } from './item-pedido.service';

@Component({
  selector: 'jhi-item-pedido',
  templateUrl: './item-pedido.component.html'
})
export class ItemPedidoComponent implements OnInit, OnDestroy {
  itemPedidos: IItemPedido[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected itemPedidoService: ItemPedidoService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.itemPedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<IItemPedido[]>) => res.ok),
        map((res: HttpResponse<IItemPedido[]>) => res.body)
      )
      .subscribe((res: IItemPedido[]) => {
        this.itemPedidos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInItemPedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IItemPedido) {
    return item.id;
  }

  registerChangeInItemPedidos() {
    this.eventSubscriber = this.eventManager.subscribe('itemPedidoListModification', response => this.loadAll());
  }
}
