import { IItemPedido } from 'app/shared/model/item-pedido.model';

export interface ITipoCocina {
  id?: number;
  nombre?: string;
  items?: IItemPedido[];
}

export class TipoCocina implements ITipoCocina {
  constructor(public id?: number, public nombre?: string, public items?: IItemPedido[]) {}
}
