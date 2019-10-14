import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { StatusItemPedidoComponent } from 'app/entities/status-item-pedido/status-item-pedido.component';
import { StatusItemPedidoService } from 'app/entities/status-item-pedido/status-item-pedido.service';
import { StatusItemPedido } from 'app/shared/model/status-item-pedido.model';

describe('Component Tests', () => {
  describe('StatusItemPedido Management Component', () => {
    let comp: StatusItemPedidoComponent;
    let fixture: ComponentFixture<StatusItemPedidoComponent>;
    let service: StatusItemPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [StatusItemPedidoComponent],
        providers: []
      })
        .overrideTemplate(StatusItemPedidoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(StatusItemPedidoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(StatusItemPedidoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new StatusItemPedido(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.statusItemPedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
