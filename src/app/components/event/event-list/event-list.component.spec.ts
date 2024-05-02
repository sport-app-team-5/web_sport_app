import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import { of } from 'rxjs';
import {EventService} from "../event.service";
import {EventListComponent} from "./event-list.component";
import {HttpLoaderFactory} from "../../../app.config";
import {HttpClient} from "@angular/common/http";

describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let toastrService: ToastrService;
  let translateService: TranslateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    toastrService = TestBed.inject(ToastrService);
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should switch language', () => {
    spyOn(translateService, 'use');
    component.switchLanguage('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });

  it('should get events successfully', () => {
    const mockEvents = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
    const eventService = TestBed.inject(EventService);
    spyOn(eventService, 'getEvents').and.returnValue(of(mockEvents));

    component.getEvents();

    expect(component.events).toEqual(mockEvents);
  });
});
