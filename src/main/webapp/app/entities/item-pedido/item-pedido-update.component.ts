import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IItemPedido, ItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from './item-pedido.service';
import { ITipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';
import { TipoItemPedidoService } from 'app/entities/tipo-item-pedido/tipo-item-pedido.service';
import { ITipoCocina } from 'app/shared/model/tipo-cocina.model';
import { TipoCocinaService } from 'app/entities/tipo-cocina/tipo-cocina.service';
import { IIngrediente } from 'app/shared/model/ingrediente.model';
import { IngredienteService } from 'app/entities/ingrediente/ingrediente.service';
import { IMenu } from 'app/shared/model/menu.model';
import { MenuService } from 'app/entities/menu/menu.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido/pedido.service';

@Component({
  selector: 'jhi-item-pedido-update',
  templateUrl: './item-pedido-update.component.html'
})
export class ItemPedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  tipoitempedidos: ITipoItemPedido[];

  tipococinas: ITipoCocina[];

  ingredientes: IIngrediente[];

  menus: IMenu[];

  pedidos: IPedido[];

  editForm = this.fb.group({
    id: [],
    nombre: [],
    descripcion: [],
    precio: [],
    tiempoPreparacion: [],
    tipoItemPedidos: [],
    tipoCocinas: [],
    ingredientes: [],
    menus: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected itemPedidoService: ItemPedidoService,
    protected tipoItemPedidoService: TipoItemPedidoService,
    protected tipoCocinaService: TipoCocinaService,
    protected ingredienteService: IngredienteService,
    protected menuService: MenuService,
    protected pedidoService: PedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ itemPedido }) => {
      this.updateForm(itemPedido);
    });
    this.tipoItemPedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoItemPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoItemPedido[]>) => response.body)
      )
      .subscribe((res: ITipoItemPedido[]) => (this.tipoitempedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoCocinaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoCocina[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoCocina[]>) => response.body)
      )
      .subscribe((res: ITipoCocina[]) => (this.tipococinas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.ingredienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IIngrediente[]>) => mayBeOk.ok),
        map((response: HttpResponse<IIngrediente[]>) => response.body)
      )
      .subscribe((res: IIngrediente[]) => (this.ingredientes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.menuService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMenu[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMenu[]>) => response.body)
      )
      .subscribe((res: IMenu[]) => (this.menus = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.pedidoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPedido[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPedido[]>) => response.body)
      )
      .subscribe((res: IPedido[]) => (this.pedidos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(itemPedido: IItemPedido) {
    this.editForm.patchValue({
      id: itemPedido.id,
      nombre: itemPedido.nombre,
      descripcion: itemPedido.descripcion,
      precio: itemPedido.precio,
      tiempoPreparacion: itemPedido.tiempoPreparacion,
      tipoItemPedidos: itemPedido.tipoItemPedidos,
      tipoCocinas: itemPedido.tipoCocinas,
      ingredientes: itemPedido.ingredientes,
      menus: itemPedido.menus
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const itemPedido = this.createFromForm();
    if (itemPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.itemPedidoService.update(itemPedido));
    } else {
      this.subscribeToSaveResponse(this.itemPedidoService.create(itemPedido));
    }
  }

  private createFromForm(): IItemPedido {
    return {
      ...new ItemPedido(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      precio: this.editForm.get(['precio']).value,
      tiempoPreparacion: this.editForm.get(['tiempoPreparacion']).value,
      tipoItemPedidos: this.editForm.get(['tipoItemPedidos']).value,
      tipoCocinas: this.editForm.get(['tipoCocinas']).value,
      ingredientes: this.editForm.get(['ingredientes']).value,
      menus: this.editForm.get(['menus']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IItemPedido>>) {
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

  trackTipoItemPedidoById(index: number, item: ITipoItemPedido) {
    return item.id;
  }

  trackTipoCocinaById(index: number, item: ITipoCocina) {
    return item.id;
  }

  trackIngredienteById(index: number, item: IIngrediente) {
    return item.id;
  }

  trackMenuById(index: number, item: IMenu) {
    return item.id;
  }

  trackPedidoById(index: number, item: IPedido) {
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
