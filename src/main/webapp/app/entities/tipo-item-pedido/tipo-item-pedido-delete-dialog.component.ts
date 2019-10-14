import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoItemPedido } from 'app/shared/model/tipo-item-pedido.model';
import { TipoItemPedidoService } from './tipo-item-pedido.service';

@Component({
  selector: 'jhi-tipo-item-pedido-delete-dialog',
  templateUrl: './tipo-item-pedido-delete-dialog.component.html'
})
export class TipoItemPedidoDeleteDialogComponent {
  tipoItemPedido: ITipoItemPedido;

  constructor(
    protected tipoItemPedidoService: TipoItemPedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoItemPedidoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoItemPedidoListModification',
        content: 'Deleted an tipoItemPedido'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-item-pedido-delete-popup',
  template: ''
})
export class TipoItemPedidoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoItemPedido }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoItemPedidoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoItemPedido = tipoItemPedido;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-item-pedido', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-item-pedido', { outlets: { popup: null } }]);
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
