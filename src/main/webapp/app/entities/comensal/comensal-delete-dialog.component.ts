import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IComensal } from 'app/shared/model/comensal.model';
import { ComensalService } from './comensal.service';

@Component({
  selector: 'jhi-comensal-delete-dialog',
  templateUrl: './comensal-delete-dialog.component.html'
})
export class ComensalDeleteDialogComponent {
  comensal: IComensal;

  constructor(protected comensalService: ComensalService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.comensalService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'comensalListModification',
        content: 'Deleted an comensal'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-comensal-delete-popup',
  template: ''
})
export class ComensalDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ comensal }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ComensalDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.comensal = comensal;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/comensal', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/comensal', { outlets: { popup: null } }]);
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
