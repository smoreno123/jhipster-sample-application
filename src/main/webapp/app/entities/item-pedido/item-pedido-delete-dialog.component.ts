import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IItemPedido } from 'app/shared/model/item-pedido.model';
import { ItemPedidoService } from './item-pedido.service';

@Component({
  selector: 'jhi-item-pedido-delete-dialog',
  templateUrl: './item-pedido-delete-dialog.component.html'
})
export class ItemPedidoDeleteDialogComponent {
  itemPedido: IItemPedido;

  constructor(
    protected itemPedidoService: ItemPedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.itemPedidoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'itemPedidoListModification',
        content: 'Deleted an itemPedido'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-item-pedido-delete-popup',
  template: ''
})
export class ItemPedidoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ itemPedido }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ItemPedidoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.itemPedido = itemPedido;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/item-pedido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/item-pedido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
