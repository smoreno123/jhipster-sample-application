import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterSampleApplicationTestModule } from '../../../test.module';
import { ComensalUpdateComponent } from 'app/entities/comensal/comensal-update.component';
import { ComensalService } from 'app/entities/comensal/comensal.service';
import { Comensal } from 'app/shared/model/comensal.model';

describe('Component Tests', () => {
  describe('Comensal Management Update Component', () => {
    let comp: ComensalUpdateComponent;
    let fixture: ComponentFixture<ComensalUpdateComponent>;
    let service: ComensalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterSampleApplicationTestModule],
        declarations: [ComensalUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ComensalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ComensalUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ComensalService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Comensal(123);
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
        const entity = new Comensal();
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
