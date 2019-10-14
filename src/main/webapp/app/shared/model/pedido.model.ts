import { Moment } from 'moment';
import { IMesa } from 'app/shared/model/mesa.model';
import { IMenu } from 'app/shared/model/menu.model';
import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { IValoracion } from 'app/shared/model/valoracion.model';
import { IPagoPedido } from 'app/shared/model/pago-pedido.model';
import { IStatusItemPedido } from 'app/shared/model/status-item-pedido.model';

export interface IPedido {
  id?: number;
  numPedido?: number;
  fechaPedido?: Moment;
  precio?: number;
  observacionesPrecio?: string;
  mesa?: IMesa;
  menus?: IMenu[];
  itemPedidos?: IItemPedido[];
  valoracions?: IValoracion[];
  pagos?: IPagoPedido[];
  statuses?: IStatusItemPedido[];
}

export class Pedido implements IPedido {
  constructor(
    public id?: number,
    public numPedido?: number,
    public fechaPedido?: Moment,
    public precio?: number,
    public observacionesPrecio?: string,
    public mesa?: IMesa,
    public menus?: IMenu[],
    public itemPedidos?: IItemPedido[],
    public valoracions?: IValoracion[],
    public pagos?: IPagoPedido[],
    public statuses?: IStatusItemPedido[]
  ) {}
}
