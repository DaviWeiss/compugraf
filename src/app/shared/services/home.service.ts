import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/environments/environment';
import { Address } from '../models/cep';
import { DolarValue } from '../models/dolarCotacao';
import {} from 'googlemaps';
//@ts-ignore 
import Localbase from 'localbase'
import { Contracts } from '../models/contracts';

@Injectable({
  providedIn: 'root'
})

export class HomeServices {
  private dolar = endpoints.dolar;
  private address = endpoints.address;
  private distanceBetweenPoints: string = "";
  public db = new Localbase('db')

  private http: HttpClient;
  
  constructor( handler: HttpBackend) {
     this.http = new HttpClient(handler);
  }

  getDolar(date: string): Observable<DolarValue> {
    return this.http.get<DolarValue>(`${this.dolar.gov}CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$format=json`);
  }

  getAddress(cep: string): Observable<Address>{
    return this.http.get<Address>(`${this.address.cep}${cep}`)
  }

  async getDistance(destino: string): Promise<string> {
    await new google.maps.DistanceMatrixService().getDistanceMatrix({'origins': ['01228-200'], 'destinations': [destino], travelMode: google.maps.TravelMode.DRIVING}, results => {
      this.distanceBetweenPoints = results.rows[0].elements[0].distance.text;
    });
    return this.distanceBetweenPoints
  }

  savingContracts(name: string, cep: string, quantity: number, distance: string): void{
    this.db.collection('contracts').add({
      name: name,
      cep: cep,
      quantity: quantity,
      distance: distance
    })
  }

  getContracts(): Contracts{
    return this.db.collection('contracts').get();
  }
}