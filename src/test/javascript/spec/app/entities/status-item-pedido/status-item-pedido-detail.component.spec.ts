import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { StatusItemPedidoDetailComponent } from 'app/entities/status-item-pedido/status-item-pedido-detail.component';
import { StatusItemPedido } from 'app/shared/model/status-item-pedido.model';

describe('Component Tests', () => {
  describe('StatusItemPedido Management Detail Component', () => {
    let comp: StatusItemPedidoDetailComponent;
    let fixture: ComponentFixture<StatusItemPedidoDetailComponent>;
    const route = ({ data: of({ statusItemPedido: new StatusItemPedido(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [StatusItemPedidoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(StatusItemPedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(StatusItemPedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.statusItemPedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
