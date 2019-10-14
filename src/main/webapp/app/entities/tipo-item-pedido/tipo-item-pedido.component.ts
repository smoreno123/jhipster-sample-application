import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoItemPedidoService } from './tipo-item-pedido.service';

@Component({
  selector: 'jhi-tipo-item-pedido',
  templateUrl: './tipo-item-pedido.component.html'
})
export class TipoItemPedidoComponent implements OnInit, OnDestroy {
  tipoItemPedidos: ITipoItemPedido[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoItemPedidoService: TipoItemPedidoService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoItemPedidoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoItemPedido[]>) => res.ok),
        map((res: HttpResponse<ITipoItemPedido[]>) => res.body)
      )
      .subscribe((res: ITipoItemPedido[]) => {
        this.tipoItemPedidos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoItemPedidos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoItemPedido) {
    return item.id;
  }

  registerChangeInTipoItemPedidos() {
    this.eventSubscriber = this.eventManager.subscribe('tipoItemPedidoListModification', response => this.loadAll());
  }
}
