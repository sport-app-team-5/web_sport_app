import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CalendarService } from './calendar.service';
import { of } from 'rxjs';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;
  let eventsService: CalendarService;
  let toastrService: ToastrService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarComponent,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
      ],
      providers: [ToastrService, TranslateService, CalendarService, provideAnimations()]

    })
      .compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    eventsService = TestBed.inject(CalendarService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should search events and handle the response correctly', () => {
    const formattedDateStart = '2021-01-01';
    const formattedDateEnd = '2021-01-31';
    const mockEvents = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
    spyOn(eventsService, 'getAllEvents').and.returnValue(of(mockEvents));

    component.searchEvents();


    expect(eventsService.getAllEvents).toHaveBeenCalled();
    expect(component.events).toEqual(mockEvents);

  });

  it('should handle the response correctly', () => {
    const mockResponse = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
    component.handleResponseEvents(mockResponse);
    expect(component.events).toEqual(mockResponse);
  });

  it('should handle errors when getting events', () => {
    const mockError = 'Error obteniendo los eventos';
    spyOn(toastrService, 'error');

    component.handleErrorsEvents(mockError);

    expect(toastrService.error).toHaveBeenCalledWith(mockError, 'Error', {
      timeOut: 3000
    });
  })


  it('should handle errors when subscribing', () => {
    const mockError = 'Algo salió mal, intenta más tarde.';
    spyOn(toastrService, 'error');

    component.handleErrorsSubscribe(mockError);

    expect(toastrService.error).toHaveBeenCalledWith(mockError, 'Error', {
      timeOut: 3000
    });
  });

  it('should handle the response correctly when subscribing', () => {
    const mockResponse = { message: 'Inscripción exitosa' };
    spyOn(toastrService, 'success');

    component.handleResponseSubscribe(mockResponse);

    expect(toastrService.success).toHaveBeenCalledWith('Te has inscrito éxitosamente', 'Exito', {
      timeOut: 3000
    });
  });

  it('should set the event details correctly', () => {
    const mockEvent = { id: 1, name: 'Event 1' };
    component.getDetails(mockEvent,false);
    expect(component.eventDatails).toEqual(mockEvent);
  });

  it('should subscribe to an event and handle the response correctly', () => {
    const mockEvent = { id: 1, name: 'Event 1' };
    const mockSportmanId = '12345';
    spyOn(sessionStorage, 'getItem').and.returnValue(mockSportmanId);
    spyOn(eventsService, 'subscribeToEvent').and.returnValue(of({}));
    spyOn(component, 'handleResponseSubscribe');
    spyOn(component, 'handleErrorsSubscribe');

    component.subscribeToEvent(mockEvent);

    expect(sessionStorage.getItem).toHaveBeenCalledWith('sportman_id');
    expect(eventsService.subscribeToEvent).toHaveBeenCalledWith(mockEvent.id, mockSportmanId);
    expect(component.handleResponseSubscribe).toHaveBeenCalledWith({});
    expect(component.handleErrorsSubscribe).not.toHaveBeenCalled();
  });

  it('should get the day correctly', () => {
    const date = '2022-01-01T00:00:00.000Z';
    const day = component.getDay(date);
    expect(day).toEqual(31);
    console.log(day);
  });

  it('should return "Ruta" when type is "ROUTE"', () => {
    const type = 'ROUTE';
    const result = component.getType(type);
    expect(result).toEqual('Ruta');
  });

  it('should return "Evento" when type is not "ROUTE"', () => {
    const type = 'OTHER';
    const result = component.getType(type);
    expect(result).toEqual('Evento');
  });
  it('should set the class correctly when eventDatails.id matches the given id', () => {
    const id = 1;
    component.eventDatails = { id: 1, name: 'Event 1' };
    const result = component.setClassAcitve(id);
    expect(result).toEqual({
      '': true,
      'active-item-list': true
    });
  });

  it('should set the class correctly when eventDatails.id does not match the given id', () => {
    const id = 2;
    component.eventDatails = { id: 1, name: 'Event 1' };
    const result = component.setClassAcitve(id);
    expect(result).toEqual({
      '': true,
      'active-item-list': false
    });
  });

  it('should handle the response correctly for suscribed events', () => {
    const mockResponse = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
    component.handleResponseSuscribedEvents(mockResponse);
    expect(component.suscribedEvents).toEqual(mockResponse);
  });

  it('should set the default language to the value stored in localStorage', () => {
    const mockLanguage = 'en';
    spyOn(localStorage, 'getItem').and.returnValue(mockLanguage);
    spyOn(component.translate, 'setDefaultLang');

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('lang');
    expect(component.translate.setDefaultLang).toHaveBeenCalledWith(mockLanguage);
    expect(component.language).toEqual(mockLanguage);
  });

  it('should set the default language to "es" if no value is stored in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(component.translate, 'setDefaultLang');

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('lang');
    expect(component.translate.setDefaultLang).toHaveBeenCalledWith('es');
    expect(component.language).toEqual('es');
  });

  it('should return true if events array is not empty', () => {
    component.events = [{ id: 1, name: 'Event 1' }];
    const result = component.isSubscribed({});
    expect(result).toBe(true);
  });

  it('should return false if events array is empty', () => {
    component.events = [];
    const result = component.isSubscribed({});
    expect(result).toBe(false);
  });

  it('should set the risk to "Riesgo gourmet" when a key is pressed', () => {
    const event = new KeyboardEvent('keydown');
    component.handleKeyDown(event);
    expect(component.risk).toEqual('Riesgo gourmet');
  });

});
