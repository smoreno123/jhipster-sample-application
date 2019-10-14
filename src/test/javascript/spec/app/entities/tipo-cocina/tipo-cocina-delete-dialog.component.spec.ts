import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { TipoCocinaDeleteDialogComponent } from 'app/entities/tipo-cocina/tipo-cocina-delete-dialog.component';
import { TipoCocinaService } from 'app/entities/tipo-cocina/tipo-cocina.service';

describe('Component Tests', () => {
  describe('TipoCocina Management Delete Component', () => {
    let comp: TipoCocinaDeleteDialogComponent;
    let fixture: ComponentFixture<TipoCocinaDeleteDialogComponent>;
    let service: TipoCocinaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [TipoCocinaDeleteDialogComponent]
      })
        .overrideTemplate(TipoCocinaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(TipoCocinaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(TipoCocinaService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
