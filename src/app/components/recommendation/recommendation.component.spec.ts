import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RecommendationComponent } from './recommendation.component';
import { RecommendationService } from './recommendation.service';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';
import { HttpClient } from '@angular/common/http';

describe('RecommendationComponent', () => {
  let component: RecommendationComponent;
  let fixture: ComponentFixture<RecommendationComponent>;
  let recommendationService: RecommendationService;
  let toastrService: ToastrService;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [ RecommendationComponent,HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        }) ],
      providers: [
        { provide: ToastrService, useValue: jasmine.createSpyObj('ToastrService', ['success']) }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationComponent);
    component = fixture.componentInstance;
    recommendationService = TestBed.inject(RecommendationService);
    toastrService = TestBed.inject(ToastrService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProducts on ngOnInit', () => {
    const getProductsSpy = spyOn(component, 'getData');

    component.ngOnInit();

    expect(getProductsSpy).toHaveBeenCalled();
  });

  it('should call getProducts on ngOnInit', () => {
    const products = [
      {
        "id": 6,
        "category": "Food",
        "description": "ert",
        "name": "sdf",
        "cost": 45,
        "third_party_id": 1,
        "allergies": "Gluten,Peanuts,Shellfish,Soy",
        "category_food": "Vegetales"
      },
      {
        "id": 1,
        "category": "Food",
        "description": "sdfsd",
        "name": "vegetalessss",
        "cost": 3434,
        "third_party_id": 1,
        "allergies": "Gluten,Peanuts,Shellfish,Soy",
        "category_food": null
      },
      {
        "id": 2,
        "category": "Food",
        "description": "ertert",
        "name": "gdfgdf",
        "cost": 3453,
        "third_party_id": 1,
        "allergies": "Gluten,Peanuts,Shellfish,Soy",
        "category_food": "Legumbres"
      },
      {
        "id": 3,
        "category": "Food",
        "description": "gdfg",
        "name": "tert",
        "cost": 5345,
        "third_party_id": 1,
        "allergies": "Gluten,Peanuts,Shellfish,Soy",
        "category_food": "Legumbres"
      },
      {
        "id": 4,
        "category": "Food",
        "description": "dfgdf",
        "name": "dfgdfgdf",
        "cost": 345,
        "third_party_id": 1,
        "allergies": "Gluten,Peanuts,Shellfish,Soy",
        "category_food": "Productos Horneados"
      },
      {
        "id": 5,
        "category": "Food",
        "description": "erter",
        "name": "sdfsdf",
        "cost": 34534,
        "third_party_id": 1,
        "allergies": "Gluten,Peanuts,Shellfish,Soy",
        "category_food": "Aves de carne"
      }
    ];


    spyOn(recommendationService, 'getProducts').and.returnValue(of(products));

    component.ngOnInit();
    component.getData();
    fixture.detectChanges();




    products.forEach((product: any) => {
      component.processProduct(product);
    });

  });

  it('should call toastr success on callContactarme', () => {
    component.callContactarme();
    expect(toastrService.success).toHaveBeenCalledWith('Gracias por confiar en nosotros, pronto sera contactado por un agente', 'Contacto', { timeOut: 3000 });
  });
});
