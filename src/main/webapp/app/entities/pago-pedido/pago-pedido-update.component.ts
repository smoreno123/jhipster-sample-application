import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPagoPedido, PagoPedido } from 'app/shared/model/pago-pedido.model';
import { PagoPedidoService } from './pago-pedido.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido/pedido.service';
import { IComensal } from 'app/shared/model/comensal.model';
import { ComensalService } from 'app/entities/comensal/comensal.service';

@Component({
  selector: 'jhi-pago-pedido-update',
  templateUrl: './pago-pedido-update.component.html'
})
export class PagoPedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  pedidos: IPedido[];

  comensals: IComensal[];

  editForm = this.fb.group({
    id: [],
    cantidad: [],
    pedido: [],
    comensal: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pagoPedidoService: PagoPedidoService,
    protected pedidoService: PedidoService,
    protected comensalService: ComensalService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pagoPedido }) => {
      this.updateForm(pagoPedido);
    });
    this.pedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPedido[]>) => response.body)
      )
      .subscribe((res: IPedido[]) => (this.pedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.comensalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IComensal[]>) => mayBeOk.ok),
        map((response: HttpResponse<IComensal[]>) => response.body)
      )
      .subscribe((res: IComensal[]) => (this.comensals = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(pagoPedido: IPagoPedido) {
    this.editForm.patchValue({
      id: pagoPedido.id,
      cantidad: pagoPedido.cantidad,
      pedido: pagoPedido.pedido,
      comensal: pagoPedido.comensal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pagoPedido = this.createFromForm();
    if (pagoPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.pagoPedidoService.update(pagoPedido));
    } else {
      this.subscribeToSaveResponse(this.pagoPedidoService.create(pagoPedido));
    }
  }

  private createFromForm(): IPagoPedido {
    return {
      ...new PagoPedido(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      pedido: this.editForm.get(['pedido']).value,
      comensal: this.editForm.get(['comensal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagoPedido>>) {
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

  trackComensalById(index: number, item: IComensal) {
    return item.id;
  }
}
