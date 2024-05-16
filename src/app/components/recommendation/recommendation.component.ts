import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RecommendationService } from './recommendation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule
  ],
  providers: [RecommendationService],
})



export class RecommendationComponent implements OnInit {


  constructor(private recommendationService: RecommendationService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getData();

  }
  getData() {
    this.recommendationService.getProducts('Food').subscribe((data) => {
      data.forEach((product: any) => {
        this.processProduct(product);
      });
    });
  }

  processProduct(product: any): void {
    this.foodData.forEach((food) => {
      if (food.Name === product.category_food) {
        if (product.allergies) {
          this.addProduct(food, product);
        }
      }
    });
  }

  addProduct(food: FoodData, product: any) {
    const productAllergies = product.allergies.split(',').map((allergy: string) => allergy.trim());
    const hasAllergy = food.Alergias.some((allergy: string) => productAllergies.includes(allergy));
    if (!hasAllergy) {
      food.Productos.push({
        Name: product.name,
        Description: product.description,
        Cost: product.cost,
        Allergies: productAllergies
      });
    }
  }

  callContactarme() {
    this.toastr.success('Gracias por confiar en nosotros, pronto sera contactado por un agente', 'Contacto', {
      timeOut: 3000
    })  }

  foodData: FoodData[] = [
    {
        Name: "Vegetales",
        ComidaPermitida: ["Vegan", "Vegetarian", "Keto diet", "Carnivorous", "None"],
        Nutrientes: ["Vitaminas (como vitamina C, vitamina K, ácido fólico)", "minerales (como potasio, magnesio)", "fibra"],
        PorcionesRecomendadas: "1-2 tazas de vegetales frescos o cocidos.",
        CaloriasRecomendadas: "Aproximadamente 25-50 calorías por taza.",
        Beneficios: [
            "Ayudan en la recuperación muscular gracias a su contenido en antioxidantes.",
            "Proporcionan nutrientes esenciales para mantener la salud general y la función adecuada del sistema inmunológico.",
            "Contribuyen a la hidratación y la rehidratación después del ejercicio debido a su alto contenido de agua."
        ],
        Alergias: [],
        Imagen: "https://media.istockphoto.com/id/1318478175/es/foto/verduras-crudas-veganas-sobre-fondo-de-mesa-de-madera-verde.jpg?s=612x612&w=0&k=20&c=DQsf_t6jkIrt4x8Q5xFn-4p_TqAdXNTKh6CgVscrYQk=",
        Productos: []

    },
    {
        Name: "Productos Horneados",
        ComidaPermitida: ["Vegan", "Vegetarian", "Keto diet", "Carnivorous", "None"],
        Nutrientes: ["Carbohidratos complejos", "proteínas (dependiendo del tipo de producto)"],
        PorcionesRecomendadas: "1-2 rebanadas de pan integral, 1-2 piezas de panecillos, 1-2 galletas integrales.",
        CaloriasRecomendadas: "Aproximadamente 80-150 calorías por porción.",
        Beneficios: [
            "Proporcionan energía de liberación lenta para una recuperación sostenida.",
            "Ayudan a reponer los niveles de glucógeno muscular y hepático después del ejercicio.",
            "Son una fuente conveniente de nutrientes esenciales para la recuperación y el crecimiento muscular."
        ],
        Alergias: ["Gluten"],
        Imagen: "https://media.istockphoto.com/id/496564915/es/foto/pan-y-buns.jpg?s=612x612&w=0&k=20&c=v8SzuZIitjFLG8QCJosYOTBC8pD1U_FAiHSPI5MuuLg=",
        Productos: []

    },
    {
        Name: "Productos lácteos",
        ComidaPermitida: ["Vegetarian", "Keto diet", "Carnivorous", "None"],
        Nutrientes: ["Proteínas de alta calidad", "calcio", "vitamina D", "vitamina B12 (en productos lácteos fortificados)"],
        PorcionesRecomendadas: "1 taza de leche, 1 yogur griego, 1 porción de queso.",
        CaloriasRecomendadas: "Aproximadamente 80-150 calorías por porción.",
        Beneficios: [
            "Las proteínas lácteas, como la caseína y el suero, son importantes para la reparación y el crecimiento muscular.",
            "El calcio y la vitamina D son cruciales para la salud ósea y la función muscular.",
            "La vitamina B12 es esencial para la producción de glóbulos rojos y la salud del sistema nervioso."
        ],
        Alergias: ["Lactose"],
        Imagen: "https://media.istockphoto.com/id/544807136/es/foto/varios-productos-l%C3%A1cteos-frescos.jpg?s=2048x2048&w=is&k=20&c=vF5RhgZCZ70ygW6D_J6iveWYHb6PN-BZyw96YgvHhtI=",
        Productos: []
    },
    {
        Name: "Legumbres",
        ComidaPermitida: ["Vegan", "Vegetarian", "Keto diet", "None"],
        Nutrientes: ["Proteínas", "carbohidratos complejos", "fibra", "hierro", "zinc"],
        PorcionesRecomendadas: "1/2 taza de legumbres cocidas.",
        CaloriasRecomendadas: "Aproximadamente 100-150 calorías por porción.",
        Beneficios: [
            "Proporcionan una buena fuente de proteínas vegetales para la reparación y el crecimiento muscular.",
            "Son ricas en carbohidratos complejos que ayudan a reponer las reservas de glucógeno.",
            "Contienen nutrientes esenciales para la salud cardiovascular y el mantenimiento de niveles de energía estables."
        ],
        Alergias: ["Soy"],
        Imagen: "https://media.istockphoto.com/id/589415708/es/foto/frescos-de-frutas-y-verduras.jpg?s=1024x1024&w=is&k=20&c=KsR2LhK6Wo461aua3zZQvBIvlXZBTGWL97_rTSHw7Y0=",
        Productos: []
    },
    {
        Name: "Aves de carne",
        ComidaPermitida: ["Keto diet", "Carnivorous", "None"],
        Nutrientes: ["Proteínas de alta calidad", "hierro", "zinc", "vitaminas del grupo B"],
        PorcionesRecomendadas: "3-4 onzas de carne de ave cocida.",
        CaloriasRecomendadas: "Aproximadamente 120-150 calorías por porción.",
        Beneficios: [
            "Proporcionan una excelente fuente de proteínas magras para la reparación y el crecimiento muscular.",
            "Son ricas en hierro y zinc, que son importantes para la salud del sistema inmunológico y la función muscular.",
            "Las vitaminas del grupo B presentes en las aves de carne son esenciales para el metabolismo de la energía y la función nerviosa."
        ],
        Alergias: ["Peanuts", "Soy"],
        Imagen: "https://media.istockphoto.com/id/1474105026/es/foto/carne-cruda-de-pato-lista-para-cocinar-filete-de-pechuga-patas-alas-fondo-negro-vista-superior.jpg?s=2048x2048&w=is&k=20&c=WFuS_iWqOclIGBQl2D7BZeiOfYioOmnNPC9Vw0w2fok=",
        Productos: []
    }
];
}
export interface FoodData {
  ComidaPermitida: string[];
  Nutrientes: string[];
  PorcionesRecomendadas: string;
  CaloriasRecomendadas: string;
  Beneficios: string[];
  Alergias: string[];
  Imagen: string;
  Name: string;
  Productos: OfferProducts[];
}

export interface OfferProducts {
  Name: string;
  Description: string;
  Cost: number;
  Allergies: string[];
}
