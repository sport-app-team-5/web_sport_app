import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from '@angular/core'

import { RouterOutlet } from '@angular/router'
import { HeaderComponent } from './shared/components/header/header.component'
import { FooterComponent } from './shared/components/footer/footer.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div>
      <!-- <ng-template #header></ng-template>
      <router-outlet></router-outlet>
      <ng-template #footer></ng-template> -->
    </div>
  `,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // @ViewChild('header', { read: ViewContainerRef }) headerRef: ViewContainerRef
  // @ViewChild('footer', { read: ViewContainerRef }) footerRef: ViewContainerRef
  title = 'web_sport_app'
  // constructor (private componentFactoryResolver: ComponentFactoryResolver) {}

  // ngOnInit () {
  //   this.loadComponent(this.headerRef, HeaderComponent)
  //   this.loadComponent(this.footerRef, FooterComponent)
  // }

  //  private loadComponent(containerRef: ViewContainerRef, component: any) {
  //   const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
  //   containerRef.clear();
  //   containerRef.createComponent(componentFactory);
  // }
}
