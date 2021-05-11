import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { ListProductComponent } from './list-product/list-product.component';

const routes: Routes = [ 
  { path: "", component:HomeComponent},
  { path: "list", component:ListProductComponent},
  { path: "home", component:HomeComponent},
  { path: "**", component:ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
