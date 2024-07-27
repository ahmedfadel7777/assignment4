import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _ApiService: ApiService,private _Router:Router) {}

  limitedCarsArr: any[] = [];
  name: string = '';
  ngOnInit() {
    this._ApiService.getLimitedCars().subscribe({
      next: (response) => {
        console.log(response);

        this.limitedCarsArr = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  showAllVehciles(){
    this._Router.navigate(['allvehicles'])
  }

}




