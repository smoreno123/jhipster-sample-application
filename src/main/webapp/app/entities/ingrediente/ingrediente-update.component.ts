import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IIngrediente, Ingrediente } from 'app/shared/model/ingrediente.model';
import { IngredienteService } from './ingrediente.service';
import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from 'app/entities/item-pedido/item-pedido.service';

@Component({
  selector: 'jhi-ingrediente-update',
  templateUrl: './ingrediente-update.component.html'
})
export class IngredienteUpdateComponent implements OnInit {
  isSaving: boolean;

  itempedidos: IItemPedido[];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    vegetariano: [],
    vegano: [],
    kcal: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected ingredienteService: IngredienteService,
    protected itemPedidoService: ItemPedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ ingrediente }) => {
      this.updateForm(ingrediente);
    });
    this.itemPedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IItemPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<IItemPedido[]>) => response.body)
      )
      .subscribe((res: IItemPedido[]) => (this.itempedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(ingrediente: IIngrediente) {
    this.editForm.patchValue({
      id: ingrediente.id,
      nombre: ingrediente.nombre,
      vegetariano: ingrediente.vegetariano,
      vegano: ingrediente.vegano,
      kcal: ingrediente.kcal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const ingrediente = this.createFromForm();
    if (ingrediente.id !== undefined) {
      this.subscribeToSaveResponse(this.ingredienteService.update(ingrediente));
    } else {
      this.subscribeToSaveResponse(this.ingredienteService.create(ingrediente));
    }
  }

  private createFromForm(): IIngrediente {
    return {
      ...new Ingrediente(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      vegetariano: this.editForm.get(['vegetariano']).value,
      vegano: this.editForm.get(['vegano']).value,
      kcal: this.editForm.get(['kcal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIngrediente>>) {
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
