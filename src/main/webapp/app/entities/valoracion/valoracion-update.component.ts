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
import { IValoracion, Valoracion } from 'app/shared/model/valoracion.model';
import { ValoracionService } from './valoracion.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido/pedido.service';
import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from 'app/entities/item-pedido/item-pedido.service';
import { IComensal } from 'app/shared/model/comensal.model';
import { ComensalService } from 'app/entities/comensal/comensal.service';

@Component({
  selector: 'jhi-valoracion-update',
  templateUrl: './valoracion-update.component.html'
})
export class ValoracionUpdateComponent implements OnInit {
  isSaving: boolean;

  pedidos: IPedido[];

  itempedidos: IItemPedido[];

  comensals: IComensal[];

  editForm = this.fb.group({
    id: [],
    nota: [],
    observaciones: [],
    fecha: [],
    pedido: [],
    itemPedido: [],
    comensal: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected valoracionService: ValoracionService,
    protected pedidoService: PedidoService,
    protected itemPedidoService: ItemPedidoService,
    protected comensalService: ComensalService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ valoracion }) => {
      this.updateForm(valoracion);
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
    this.comensalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComensal[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComensal[]>) => response.body)
      )
      .subscribe((res: IComensal[]) => (this.comensals = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(valoracion: IValoracion) {
    this.editForm.patchValue({
      id: valoracion.id,
      nota: valoracion.nota,
      observaciones: valoracion.observaciones,
      fecha: valoracion.fecha != null ? valoracion.fecha.format(DATE_TIME_FORMAT) : null,
      pedido: valoracion.pedido,
      itemPedido: valoracion.itemPedido,
      comensal: valoracion.comensal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const valoracion = this.createFromForm();
    if (valoracion.id !== undefined) {
      this.subscribeToSaveResponse(this.valoracionService.update(valoracion));
    } else {
      this.subscribeToSaveResponse(this.valoracionService.create(valoracion));
    }
  }

  private createFromForm(): IValoracion {
    return {
      ...new Valoracion(),
      id: this.editForm.get(['id']).value,
      nota: this.editForm.get(['nota']).value,
      observaciones: this.editForm.get(['observaciones']).value,
      fecha: this.editForm.get(['fecha']).value != null ? moment(this.editForm.get(['fecha']).value, DATE_TIME_FORMAT) : undefined,
      pedido: this.editForm.get(['pedido']).value,
      itemPedido: this.editForm.get(['itemPedido']).value,
      comensal: this.editForm.get(['comensal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IValoracion>>) {
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

  trackComensalById(index: number, item: IComensal) {
    return item.id;
  }
}
