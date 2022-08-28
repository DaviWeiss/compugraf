import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CepComponent } from './cep.component';
import { CepRoutingModule } from './cep-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CepComponent
  ],
  imports: [
    CommonModule,
    CepRoutingModule,
    FormsModule
  ]
})
export class CepModule { }
