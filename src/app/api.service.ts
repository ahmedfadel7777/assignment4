import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _HttpClient: HttpClient) {}

  getLimitedCars(): Observable<any> {
    return this._HttpClient.get('https://freetestapi.com/api/v1/cars?limit=4')
  }

  getAllCars(): Observable<any> {
    return this._HttpClient.get('https://freetestapi.com/api/v1/cars')
  }

  carDetails(id:number): Observable<any> {
    return this._HttpClient.get(`https://freetestapi.com/api/v1/cars/${id}`)
  }

}



