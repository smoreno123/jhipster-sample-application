import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MesaDetailComponent } from 'app/entities/mesa/mesa-detail.component';
import { Mesa } from 'app/shared/model/mesa.model';

describe('Component Tests', () => {
  describe('Mesa Management Detail Component', () => {
    let comp: MesaDetailComponent;
    let fixture: ComponentFixture<MesaDetailComponent>;
    const route = ({ data: of({ mesa: new Mesa(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [MesaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(MesaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(MesaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.mesa).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
