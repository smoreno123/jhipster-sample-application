import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IIngrediente } from 'app/shared/model/ingrediente.model';
import { AccountService } from 'app/core/auth/account.service';
import { IngredienteService } from './ingrediente.service';

@Component({
  selector: 'jhi-ingrediente',
  templateUrl: './ingrediente.component.html'
})
export class IngredienteComponent implements OnInit, OnDestroy {
  ingredientes: IIngrediente[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected ingredienteService: IngredienteService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.ingredienteService
      .query()
      .pipe(
        filter((res: HttpResponse<IIngrediente[]>) => res.ok),
        map((res: HttpResponse<IIngrediente[]>) => res.body)
      )
      .subscribe((res: IIngrediente[]) => {
        this.ingredientes = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInIngredientes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IIngrediente) {
    return item.id;
  }

  registerChangeInIngredientes() {
    this.eventSubscriber = this.eventManager.subscribe('ingredienteListModification', response => this.loadAll());
  }
}
