import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ComensalComponent } from 'app/entities/comensal/comensal.component';
import { ComensalService } from 'app/entities/comensal/comensal.service';
import { Comensal } from 'app/shared/model/comensal.model';

describe('Component Tests', () => {
  describe('Comensal Management Component', () => {
    let comp: ComensalComponent;
    let fixture: ComponentFixture<ComensalComponent>;
    let service: ComensalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ComensalComponent],
        providers: []
      })
        .overrideTemplate(ComensalComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ComensalComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ComensalService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Comensal(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.comensals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
