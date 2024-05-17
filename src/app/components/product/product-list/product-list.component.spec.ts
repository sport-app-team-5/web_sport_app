import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../product.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpLoaderFactory } from '../../../app.config';
import { HttpClient } from '@angular/common/http';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
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
    fixture = TestBed.createComponent(ProductListComponent);
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
    const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];
    const productService = TestBed.inject(ProductService);
    spyOn(productService, 'getProducts').and.returnValue(of(mockProducts));

    component.getProducts();

    expect(component.products).toEqual(mockProducts);
  });
  it('should switch the language and update localStorage', () => {
    const language = 'en';
    spyOn(component.translate, 'use');
    spyOn(localStorage, 'setItem');
    component.switchLanguage(language);
    expect(component.translate.use).toHaveBeenCalledWith(language);

  });

  it('should set the default language to "es" if no value is stored in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(component.translate, 'setDefaultLang');

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('lang');
    expect(component.translate.setDefaultLang).toHaveBeenCalledWith('es');
    expect(component.language).toEqual('es');
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

  it('should handle error from getTrainings', () => {
    const productService = TestBed.inject(ProductService);

    spyOn(productService, 'getProducts').and.returnValue(throwError('Error'));
    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
  });


  describe('createProduct', () => {
    it('should set creatingProduct to true', () => {
      component.createProduct();

      expect(component.creatingProduct).toBeTrue();
    });
  });

  describe('closeWindow', () => {
    it('should set creatingProduct to false', () => {
      component.closeWindow();

      expect(component.creatingProduct).toBeFalse();
    });
  });
});
