import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { MesaComponent } from 'app/entities/mesa/mesa.component';
import { MesaService } from 'app/entities/mesa/mesa.service';
import { Mesa } from 'app/shared/model/mesa.model';

describe('Component Tests', () => {
  describe('Mesa Management Component', () => {
    let comp: MesaComponent;
    let fixture: ComponentFixture<MesaComponent>;
    let service: MesaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [MesaComponent],
        providers: []
      })
        .overrideTemplate(MesaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MesaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MesaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Mesa(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.mesas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
