import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule, NgIf } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductComponent } from '../product.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [NgIf,TranslateModule, ProductComponent,CommonModule],

})
export class ProductListComponent implements OnInit {

  products: any[] = [];
  language: string = 'es';
  creatingProduct: boolean = false;
  constructor(private productService: ProductService, private toastr: ToastrService,public translate: TranslateService,) { }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      let idioma = localStorage.getItem('lang');
      if (idioma != null) {
        this.translate.setDefaultLang(idioma);
        this.language = idioma;
      } else {
        this.translate.setDefaultLang('es');
        this.language = 'es';
      }
    }
    this.getProducts();
  }

  getProducts () {
    this.productService.getProducts().subscribe({
      next: (response) => {this.products = response },
      error: (err) => {
        this.toastr.error('Error obteniendo los productos', 'Error', {
          timeOut: 3000
        });
      }
    });
  }
  
  switchLanguage (language: string): void {
    this.translate.use(language)
  }

  createProduct() {
    this.creatingProduct = true;

  }

  closeWindow(){
    this.creatingProduct = false;
  }

}
