import { Contracts } from './../../shared/models/contracts';
import { HomeServices } from './../../shared/services/home.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']  
})

export class HomeComponent implements OnInit {
  public dolarValue: number = 0;
  public inputRadio: string = '';
  public showInputQuantity: boolean = false;
  public showInputReal: boolean = false;
  public yesterdayDolarValue: number = 0;
  public disabled: boolean = true;

  constructor(
    private router:Router,
    private homeServices: HomeServices,
  ) { }

  public ngOnInit(): void {
    this.getYesterdayDolarPrice()
  }
  
  getYesterdayDolarPrice(): number{
    let date = new Date();                        
    date.setDate(date.getDate() - 3);
    let dataFormatada = ((date.getMonth() + 1)) + "-" + ((date.getDate() )) + "-" + date.getFullYear(); 
    this.homeServices.getDolar(dataFormatada).subscribe(async res =>
      this.dolarValue = await res.value[0].cotacaoCompra
    );
    return this.dolarValue
  }
  
  onItemChange(value: Event){
    let radioValue = (value.target as HTMLInputElement).value;

    if(radioValue == 'radioQuantity'){
      this.showInputQuantity = true;
      this.showInputReal = false;
      this.disabled = true;
    }else{
      this.showInputReal = true;
      this.showInputQuantity = false;
      this.disabled = true;
    }
  }

  calcValue(): void{
    
    if(this.showInputQuantity){
      let dolarQuantity: number = Number((document.getElementById('dolarQuantity') as HTMLInputElement).value);
      let finalDolarValue: number = Number((dolarQuantity * this.getYesterdayDolarPrice()).toFixed(2));
      this.router.navigate(['/cep', finalDolarValue, dolarQuantity, 0]);
    }else{
      let realValue: number = Number((document.getElementById('realValue') as HTMLInputElement).value);
      let quantity: number = Math.floor(realValue / this.getYesterdayDolarPrice());
      let finalRealValueToSpend: number = Number((quantity * this.getYesterdayDolarPrice()).toFixed(2));
      let restOfRealValue: number = Number((realValue - finalRealValueToSpend).toFixed(2));
      this.router.navigate(['/cep', finalRealValueToSpend, quantity, restOfRealValue]);
    }
  }

  setDisable(){
    this.disabled = false;
  }
}