import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { StatusItemPedidoUpdateComponent } from 'app/entities/status-item-pedido/status-item-pedido-update.component';
import { StatusItemPedidoService } from 'app/entities/status-item-pedido/status-item-pedido.service';
import { StatusItemPedido } from 'app/shared/model/status-item-pedido.model';

describe('Component Tests', () => {
  describe('StatusItemPedido Management Update Component', () => {
    let comp: StatusItemPedidoUpdateComponent;
    let fixture: ComponentFixture<StatusItemPedidoUpdateComponent>;
    let service: StatusItemPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [StatusItemPedidoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(StatusItemPedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatusItemPedidoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatusItemPedidoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new StatusItemPedido(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new StatusItemPedido();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
