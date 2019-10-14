import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoCocina } from 'app/shared/model/tipo-cocina.model';
import { TipoCocinaService } from './tipo-cocina.service';

@Component({
  selector: 'jhi-tipo-cocina-delete-dialog',
  templateUrl: './tipo-cocina-delete-dialog.component.html'
})
export class TipoCocinaDeleteDialogComponent {
  tipoCocina: ITipoCocina;

  constructor(
    protected tipoCocinaService: TipoCocinaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoCocinaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoCocinaListModification',
        content: 'Deleted an tipoCocina'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-cocina-delete-popup',
  template: ''
})
export class TipoCocinaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoCocina }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoCocinaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoCocina = tipoCocina;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-cocina', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-cocina', { outlets: { popup: null } }]);
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
