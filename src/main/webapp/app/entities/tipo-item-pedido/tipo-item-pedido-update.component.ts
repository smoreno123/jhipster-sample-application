import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoItemPedido, TipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';
import { TipoItemPedidoService } from './tipo-item-pedido.service';
import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from 'app/entities/item-pedido/item-pedido.service';

@Component({
  selector: 'jhi-tipo-item-pedido-update',
  templateUrl: './tipo-item-pedido-update.component.html'
})
export class TipoItemPedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  itempedidos: IItemPedido[];

  editForm = this.fb.group({
    id: [],
    nombreTipo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tipoItemPedidoService: TipoItemPedidoService,
    protected itemPedidoService: ItemPedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoItemPedido }) => {
      this.updateForm(tipoItemPedido);
    });
    this.itemPedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemPedido[]>) => response.body)
      )
      .subscribe((res: IItemPedido[]) => (this.itempedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoItemPedido: ITipoItemPedido) {
    this.editForm.patchValue({
      id: tipoItemPedido.id,
      nombreTipo: tipoItemPedido.nombreTipo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoItemPedido = this.createFromForm();
    if (tipoItemPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoItemPedidoService.update(tipoItemPedido));
    } else {
      this.subscribeToSaveResponse(this.tipoItemPedidoService.create(tipoItemPedido));
    }
  }

  private createFromForm(): ITipoItemPedido {
    return {
      ...new TipoItemPedido(),
      id: this.editForm.get(['id']).value,
      nombreTipo: this.editForm.get(['nombreTipo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoItemPedido>>) {
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
