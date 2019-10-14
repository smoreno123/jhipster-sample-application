import { Moment } from 'moment';
import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { IPedido } from 'app/shared/model/pedido.model';

export interface IMenu {
  id?: number;
  fechaInicio?: Moment;
  fechaFinal?: Moment;
  nombre?: string;
  precio?: number;
  items?: IItemPedido[];
  pedidos?: IPedido[];
}

export class Menu implements IMenu {
  constructor(
    public id?: number,
    public fechaInicio?: Moment,
    public fechaFinal?: Moment,
    public nombre?: string,
    public precio?: number,
    public items?: IItemPedido[],
    public pedidos?: IPedido[]
  ) {}
}
