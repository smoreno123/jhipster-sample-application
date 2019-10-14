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
import { IStatusItemPedido, StatusItemPedido } from 'app/shared/model/status-item-pedido.model';
import { StatusItemPedidoService } from './status-item-pedido.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido/pedido.service';
import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from 'app/entities/item-pedido/item-pedido.service';

@Component({
  selector: 'jhi-status-item-pedido-update',
  templateUrl: './status-item-pedido-update.component.html'
})
export class StatusItemPedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  pedidos: IPedido[];

  itempedidos: IItemPedido[];

  editForm = this.fb.group({
    id: [],
    preparado: [],
    horaInicio: [],
    horaFinalizacion: [],
    pedido: [],
    itemPedido: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected statusItemPedidoService: StatusItemPedidoService,
    protected pedidoService: PedidoService,
    protected itemPedidoService: ItemPedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ statusItemPedido }) => {
      this.updateForm(statusItemPedido);
    });
    this.pedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPedido[]>) => response.body)
      )
      .subscribe((res: IPedido[]) => (this.pedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.itemPedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemPedido[]>) => response.body)
      )
      .subscribe((res: IItemPedido[]) => (this.itempedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(statusItemPedido: IStatusItemPedido) {
    this.editForm.patchValue({
      id: statusItemPedido.id,
      preparado: statusItemPedido.preparado,
      horaInicio: statusItemPedido.horaInicio != null ? statusItemPedido.horaInicio.format(DATE_TIME_FORMAT) : null,
      horaFinalizacion: statusItemPedido.horaFinalizacion != null ? statusItemPedido.horaFinalizacion.format(DATE_TIME_FORMAT) : null,
      pedido: statusItemPedido.pedido,
      itemPedido: statusItemPedido.itemPedido
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const statusItemPedido = this.createFromForm();
    if (statusItemPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.statusItemPedidoService.update(statusItemPedido));
    } else {
      this.subscribeToSaveResponse(this.statusItemPedidoService.create(statusItemPedido));
    }
  }

  private createFromForm(): IStatusItemPedido {
    return {
      ...new StatusItemPedido(),
      id: this.editForm.get(['id']).value,
      preparado: this.editForm.get(['preparado']).value,
      horaInicio:
        this.editForm.get(['horaInicio']).value != null ? moment(this.editForm.get(['horaInicio']).value, DATE_TIME_FORMAT) : undefined,
      horaFinalizacion:
        this.editForm.get(['horaFinalizacion']).value != null
          ? moment(this.editForm.get(['horaFinalizacion']).value, DATE_TIME_FORMAT)
          : undefined,
      pedido: this.editForm.get(['pedido']).value,
      itemPedido: this.editForm.get(['itemPedido']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStatusItemPedido>>) {
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

  trackPedidoById(index: number, item: IPedido) {
    return item.id;
  }

  trackItemPedidoById(index: number, item: IItemPedido) {
    return item.id;
  }
}
