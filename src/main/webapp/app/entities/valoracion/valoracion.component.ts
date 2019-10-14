import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IValoracion } from 'app/shared/model/valoracion.model';
import { AccountService } from 'app/core/auth/account.service';
import { ValoracionService } from './valoracion.service';

@Component({
  selector: 'jhi-valoracion',
  templateUrl: './valoracion.component.html'
})
export class ValoracionComponent implements OnInit, OnDestroy {
  valoracions: IValoracion[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected valoracionService: ValoracionService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.valoracionService
      .query()
      .pipe(
        filter((res: HttpResponse<IValoracion[]>) => res.ok),
        map((res: HttpResponse<IValoracion[]>) => res.body)
      )
      .subscribe((res: IValoracion[]) => {
        this.valoracions = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInValoracions();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IValoracion) {
    return item.id;
  }

  registerChangeInValoracions() {
    this.eventSubscriber = this.eventManager.subscribe('valoracionListModification', response => this.loadAll());
  }
}
