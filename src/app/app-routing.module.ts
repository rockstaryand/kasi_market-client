import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [

  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'product/:id', component: ProductComponent

  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
