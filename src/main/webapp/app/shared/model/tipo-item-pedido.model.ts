import { IItemPedido } from 'app/shared/model/item-pedido.model';

export interface ITipoItemPedido {
  id?: number;
  nombreTipo?: string;
  items?: IItemPedido[];
}

export class TipoItemPedido implements ITipoItemPedido {
  constructor(public id?: number, public nombreTipo?: string, public items?: IItemPedido[]) {}
}
