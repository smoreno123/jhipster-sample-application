import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoCocina, TipoCocina } from 'app/shared/model/tipo-cocina.model';
import { TipoCocinaService } from './tipo-cocina.service';
import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from 'app/entities/item-pedido/item-pedido.service';

@Component({
  selector: 'jhi-tipo-cocina-update',
  templateUrl: './tipo-cocina-update.component.html'
})
export class TipoCocinaUpdateComponent implements OnInit {
  isSaving: boolean;

  itempedidos: IItemPedido[];

  editForm = this.fb.group({
    id: [],
    nombre: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tipoCocinaService: TipoCocinaService,
    protected itemPedidoService: ItemPedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoCocina }) => {
      this.updateForm(tipoCocina);
    });
    this.itemPedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemPedido[]>) => response.body)
      )
      .subscribe((res: IItemPedido[]) => (this.itempedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoCocina: ITipoCocina) {
    this.editForm.patchValue({
      id: tipoCocina.id,
      nombre: tipoCocina.nombre
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoCocina = this.createFromForm();
    if (tipoCocina.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoCocinaService.update(tipoCocina));
    } else {
      this.subscribeToSaveResponse(this.tipoCocinaService.create(tipoCocina));
    }
  }

  private createFromForm(): ITipoCocina {
    return {
      ...new TipoCocina(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoCocina>>) {
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
