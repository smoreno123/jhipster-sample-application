import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PagoPedidoComponent } from 'app/entities/pago-pedido/pago-pedido.component';
import { PagoPedidoService } from 'app/entities/pago-pedido/pago-pedido.service';
import { PagoPedido } from 'app/shared/model/pago-pedido.model';

describe('Component Tests', () => {
  describe('PagoPedido Management Component', () => {
    let comp: PagoPedidoComponent;
    let fixture: ComponentFixture<PagoPedidoComponent>;
    let service: PagoPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PagoPedidoComponent],
        providers: []
      })
        .overrideTemplate(PagoPedidoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PagoPedidoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PagoPedidoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PagoPedido(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.pagoPedidos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
