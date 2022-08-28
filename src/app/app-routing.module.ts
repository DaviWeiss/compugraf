import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  { 
    path: 'cep/:realValue/:dolarQuantity/:rest',
    loadChildren: () => import('./modules/cep/cep.module').then(m => m.CepModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./modules/success/success.module').then(m => m.SuccessModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
