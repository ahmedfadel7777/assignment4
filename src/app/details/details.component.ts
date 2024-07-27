import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit{

  constructor(private _ApiService:ApiService,private _ActivatedRoute:ActivatedRoute){}


  carDetails: any = {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'))
      if (id) {
        this.getDetails(id)
      }
    })
  }

getDetails(id:number){
      this._ApiService.carDetails(id).subscribe({
        next:(response)=>{
          console.log(response)
          this.carDetails=response
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }

}
