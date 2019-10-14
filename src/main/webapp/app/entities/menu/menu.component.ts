import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IMenu } from 'app/shared/model/menu.model';
import { AccountService } from 'app/core/auth/account.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'jhi-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {
  menus: IMenu[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected menuService: MenuService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.menuService
      .query()
      .pipe(
        filter((res: HttpResponse<IMenu[]>) => res.ok),
        map((res: HttpResponse<IMenu[]>) => res.body)
      )
      .subscribe((res: IMenu[]) => {
        this.menus = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMenus();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMenu) {
    return item.id;
  }

  registerChangeInMenus() {
    this.eventSubscriber = this.eventManager.subscribe('menuListModification', response => this.loadAll());
  }
}
