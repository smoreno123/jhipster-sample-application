import { IItemPedido } from 'app/shared/model/item-pedido.model';

export interface IIngrediente {
  id?: number;
  nombre?: string;
  vegetariano?: boolean;
  vegano?: boolean;
  kcal?: number;
  items?: IItemPedido[];
}

export class Ingrediente implements IIngrediente {
  constructor(
    public id?: number,
    public nombre?: string,
    public vegetariano?: boolean,
    public vegano?: boolean,
    public kcal?: number,
    public items?: IItemPedido[]
  ) {
    this.vegetariano = this.vegetariano || false;
    this.vegano = this.vegano || false;
  }
}
