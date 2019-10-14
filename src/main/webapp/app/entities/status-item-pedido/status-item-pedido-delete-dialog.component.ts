import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStatusItemPedido } from 'app/shared/model/status-item-pedido.model';
import { StatusItemPedidoService } from './status-item-pedido.service';

@Component({
  selector: 'jhi-status-item-pedido-delete-dialog',
  templateUrl: './status-item-pedido-delete-dialog.component.html'
})
export class StatusItemPedidoDeleteDialogComponent {
  statusItemPedido: IStatusItemPedido;

  constructor(
    protected statusItemPedidoService: StatusItemPedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.statusItemPedidoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'statusItemPedidoListModification',
        content: 'Deleted an statusItemPedido'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-status-item-pedido-delete-popup',
  template: ''
})
export class StatusItemPedidoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ statusItemPedido }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(StatusItemPedidoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.statusItemPedido = statusItemPedido;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/status-item-pedido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/status-item-pedido', { outlets: { popup: null } }]);
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
