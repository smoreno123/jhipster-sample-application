import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { PagoPedidoDetailComponent } from 'app/entities/pago-pedido/pago-pedido-detail.component';
import { PagoPedido } from 'app/shared/model/pago-pedido.model';

describe('Component Tests', () => {
  describe('PagoPedido Management Detail Component', () => {
    let comp: PagoPedidoDetailComponent;
    let fixture: ComponentFixture<PagoPedidoDetailComponent>;
    const route = ({ data: of({ pagoPedido: new PagoPedido(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [PagoPedidoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PagoPedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PagoPedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pagoPedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
