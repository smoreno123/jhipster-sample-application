import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ComensalDetailComponent } from 'app/entities/comensal/comensal-detail.component';
import { Comensal } from 'app/shared/model/comensal.model';

describe('Component Tests', () => {
  describe('Comensal Management Detail Component', () => {
    let comp: ComensalDetailComponent;
    let fixture: ComponentFixture<ComensalDetailComponent>;
    const route = ({ data: of({ comensal: new Comensal(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ComensalDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ComensalDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ComensalDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.comensal).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
