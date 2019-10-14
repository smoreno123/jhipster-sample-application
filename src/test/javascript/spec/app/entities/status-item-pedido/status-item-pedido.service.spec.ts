import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { StatusItemPedidoService } from 'app/entities/status-item-pedido/status-item-pedido.service';
import { IStatusItemPedido, StatusItemPedido } from 'app/shared/model/status-item-pedido.model';

describe('Service Tests', () => {
  describe('StatusItemPedido Service', () => {
    let injector: TestBed;
    let service: StatusItemPedidoService;
    let httpMock: HttpTestingController;
    let elemDefault: IStatusItemPedido;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(StatusItemPedidoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new StatusItemPedido(0, false, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFinalizacion: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a StatusItemPedido', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFinalizacion: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            horaInicio: currentDate,
            horaFinalizacion: currentDate
          },
          returnedFromService
        );
        service
          .create(new StatusItemPedido(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a StatusItemPedido', () => {
        const returnedFromService = Object.assign(
          {
            preparado: true,
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFinalizacion: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            horaInicio: currentDate,
            horaFinalizacion: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of StatusItemPedido', () => {
        const returnedFromService = Object.assign(
          {
            preparado: true,
            horaInicio: currentDate.format(DATE_TIME_FORMAT),
            horaFinalizacion: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            horaInicio: currentDate,
            horaFinalizacion: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a StatusItemPedido', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
