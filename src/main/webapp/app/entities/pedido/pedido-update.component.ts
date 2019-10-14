import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IPedido, Pedido } from 'app/shared/model/pedido.model';
import { PedidoService } from './pedido.service';
import { IMesa } from 'app/shared/model/mesa.model';
import { MesaService } from 'app/entities/mesa/mesa.service';
import { IMenu } from 'app/shared/model/menu.model';
import { MenuService } from 'app/entities/menu/menu.service';
import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from 'app/entities/item-pedido/item-pedido.service';

@Component({
  selector: 'jhi-pedido-update',
  templateUrl: './pedido-update.component.html'
})
export class PedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  mesas: IMesa[];

  menus: IMenu[];

  itempedidos: IItemPedido[];

  editForm = this.fb.group({
    id: [],
    numPedido: [],
    fechaPedido: [],
    precio: [],
    observacionesPrecio: [],
    mesa: [],
    menus: [],
    itemPedidos: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pedidoService: PedidoService,
    protected mesaService: MesaService,
    protected menuService: MenuService,
    protected itemPedidoService: ItemPedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pedido }) => {
      this.updateForm(pedido);
    });
    this.mesaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMesa[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMesa[]>) => response.body)
      )
      .subscribe((res: IMesa[]) => (this.mesas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.menuService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMenu[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMenu[]>) => response.body)
      )
      .subscribe((res: IMenu[]) => (this.menus = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.itemPedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemPedido[]>) => response.body)
      )
      .subscribe((res: IItemPedido[]) => (this.itempedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(pedido: IPedido) {
    this.editForm.patchValue({
      id: pedido.id,
      numPedido: pedido.numPedido,
      fechaPedido: pedido.fechaPedido != null ? pedido.fechaPedido.format(DATE_TIME_FORMAT) : null,
      precio: pedido.precio,
      observacionesPrecio: pedido.observacionesPrecio,
      mesa: pedido.mesa,
      menus: pedido.menus,
      itemPedidos: pedido.itemPedidos
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pedido = this.createFromForm();
    if (pedido.id !== undefined) {
      this.subscribeToSaveResponse(this.pedidoService.update(pedido));
    } else {
      this.subscribeToSaveResponse(this.pedidoService.create(pedido));
    }
  }

  private createFromForm(): IPedido {
    return {
      ...new Pedido(),
      id: this.editForm.get(['id']).value,
      numPedido: this.editForm.get(['numPedido']).value,
      fechaPedido:
        this.editForm.get(['fechaPedido']).value != null ? moment(this.editForm.get(['fechaPedido']).value, DATE_TIME_FORMAT) : undefined,
      precio: this.editForm.get(['precio']).value,
      observacionesPrecio: this.editForm.get(['observacionesPrecio']).value,
      mesa: this.editForm.get(['mesa']).value,
      menus: this.editForm.get(['menus']).value,
      itemPedidos: this.editForm.get(['itemPedidos']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedido>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMesaById(index: number, item: IMesa) {
    return item.id;
  }

  trackMenuById(index: number, item: IMenu) {
    return item.id;
  }

  trackItemPedidoById(index: number, item: IItemPedido) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
