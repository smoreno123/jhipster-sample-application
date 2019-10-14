import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IComensal } from 'app/shared/model/comensal.model';
import { AccountService } from 'app/core/auth/account.service';
import { ComensalService } from './comensal.service';

@Component({
  selector: 'jhi-comensal',
  templateUrl: './comensal.component.html'
})
export class ComensalComponent implements OnInit, OnDestroy {
  comensals: IComensal[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected comensalService: ComensalService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.comensalService
      .query()
      .pipe(
        filter((res: HttpResponse<IComensal[]>) => res.ok),
        map((res: HttpResponse<IComensal[]>) => res.body)
      )
      .subscribe((res: IComensal[]) => {
        this.comensals = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInComensals();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IComensal) {
    return item.id;
  }

  registerChangeInComensals() {
    this.eventSubscriber = this.eventManager.subscribe('comensalListModification', response => this.loadAll());
  }
}
