import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IMesa } from 'app/shared/model/mesa.model';
import { AccountService } from 'app/core/auth/account.service';
import { MesaService } from './mesa.service';

@Component({
  selector: 'jhi-mesa',
  templateUrl: './mesa.component.html'
})
export class MesaComponent implements OnInit, OnDestroy {
  mesas: IMesa[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected mesaService: MesaService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.mesaService
      .query()
      .pipe(
        filter((res: HttpResponse<IMesa[]>) => res.ok),
        map((res: HttpResponse<IMesa[]>) => res.body)
      )
      .subscribe((res: IMesa[]) => {
        this.mesas = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMesas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMesa) {
    return item.id;
  }

  registerChangeInMesas() {
    this.eventSubscriber = this.eventManager.subscribe('mesaListModification', response => this.loadAll());
  }
}
