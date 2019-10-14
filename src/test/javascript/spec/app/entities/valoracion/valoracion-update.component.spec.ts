import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ValoracionUpdateComponent } from 'app/entities/valoracion/valoracion-update.component';
import { ValoracionService } from 'app/entities/valoracion/valoracion.service';
import { Valoracion } from 'app/shared/model/valoracion.model';

describe('Component Tests', () => {
  describe('Valoracion Management Update Component', () => {
    let comp: ValoracionUpdateComponent;
    let fixture: ComponentFixture<ValoracionUpdateComponent>;
    let service: ValoracionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ValoracionUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ValoracionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ValoracionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ValoracionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Valoracion(123);
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
        const entity = new Valoracion();
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
