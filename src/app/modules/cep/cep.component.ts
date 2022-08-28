import { Address } from './../../shared/models/cep';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HomeServices } from 'src/app/shared/services/home.service';

@Component({
  selector: 'app-cep',
  templateUrl: './cep.component.html',
  styleUrls: ['./cep.component.scss'],
})

export class CepComponent implements OnInit {
  private realValue: number = 0;
  private dolarQuantity: number = 0;
  private rest: number = 0;
  private address: string = '';
  public distance: string = '';
  public stringValue: string = '';
  public value: number = 0;
  public showHireButton: boolean = false;
  public name: string = '';
  public cep: string = '';

  constructor(
    private route: ActivatedRoute,
    private homeServices: HomeServices,
    private router: Router,
  ) { 
    this.route.params.subscribe(
      params => { 
        this.realValue = Number(params['realValue']);
        this.dolarQuantity = params['dolarQuantity'];
        this.rest = params['rest'];
      }
    );
  }

  public ngOnInit(): void {
  }

  calcShipping(formCep: NgForm): void{
    this.name = formCep.value.inputName;
    this.cep = formCep.value.inputCep;
    this.homeServices.getDistance(this.cep).then(res => {
      this.distance = res
      this.stringValue = Number(res.replace(' km', '').replace(',', '.')).toFixed()
      this.value = Number(this.stringValue)
    }
    );
    this.homeServices.getAddress(this.cep).subscribe(res => {
        this.address = res.logradouro
    });
    setTimeout(() => {
      let valueShipping = (document.getElementById('value-shipping') as HTMLElement);
      valueShipping.innerText = `${this.name}, o valor do frete para realizar a entrega em ${this.address} com uma distância de ${this.distance} é de R$ ${this.value},00`
      this.calcFinalValue(this.value);
    }, (1000))
  }

  calcFinalValue(value: number){
    const finalValue = (value + this.realValue).toFixed(2).replace('.', ',');
    let textFinalValue = (document.getElementById('text-final-value') as HTMLElement);
    textFinalValue.innerText = `O valor final da cotação é de: R$ ${finalValue}`;
    this.showHireButton = true;
    this.homeServices.savingContracts(this.name, this.cep, this.dolarQuantity, this.distance) 
  }

  goToNextPage = () => this.router.navigate(['success']);

}
