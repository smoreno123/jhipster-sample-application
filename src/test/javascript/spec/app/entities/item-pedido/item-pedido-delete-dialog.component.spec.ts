import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ItemPedidoDeleteDialogComponent } from 'app/entities/item-pedido/item-pedido-delete-dialog.component';
import { ItemPedidoService } from 'app/entities/item-pedido/item-pedido.service';

describe('Component Tests', () => {
  describe('ItemPedido Management Delete Component', () => {
    let comp: ItemPedidoDeleteDialogComponent;
    let fixture: ComponentFixture<ItemPedidoDeleteDialogComponent>;
    let service: ItemPedidoService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ItemPedidoDeleteDialogComponent]
      })
        .overrideTemplate(ItemPedidoDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ItemPedidoDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ItemPedidoService);
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
