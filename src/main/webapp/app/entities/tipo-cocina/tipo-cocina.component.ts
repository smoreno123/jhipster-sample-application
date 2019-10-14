import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoCocina } from 'app/shared/model/tipo-cocina.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoCocinaService } from './tipo-cocina.service';

@Component({
  selector: 'jhi-tipo-cocina',
  templateUrl: './tipo-cocina.component.html'
})
export class TipoCocinaComponent implements OnInit, OnDestroy {
  tipoCocinas: ITipoCocina[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoCocinaService: TipoCocinaService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoCocinaService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoCocina[]>) => res.ok),
        map((res: HttpResponse<ITipoCocina[]>) => res.body)
      )
      .subscribe((res: ITipoCocina[]) => {
        this.tipoCocinas = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoCocinas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoCocina) {
    return item.id;
  }

  registerChangeInTipoCocinas() {
    this.eventSubscriber = this.eventManager.subscribe('tipoCocinaListModification', response => this.loadAll());
  }
}
