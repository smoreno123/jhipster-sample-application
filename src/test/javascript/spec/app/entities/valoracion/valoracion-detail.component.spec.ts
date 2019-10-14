import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ValoracionDetailComponent } from 'app/entities/valoracion/valoracion-detail.component';
import { Valoracion } from 'app/shared/model/valoracion.model';

describe('Component Tests', () => {
  describe('Valoracion Management Detail Component', () => {
    let comp: ValoracionDetailComponent;
    let fixture: ComponentFixture<ValoracionDetailComponent>;
    const route = ({ data: of({ valoracion: new Valoracion(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ValoracionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ValoracionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ValoracionDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.valoracion).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
