import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-vehicles',
  templateUrl: './all-vehicles.component.html',
  styleUrls: ['./all-vehicles.component.css'],
})
export class AllVehiclesComponent implements OnInit {

  allCars: any[] = [];
  filteredCars: any[] = [];
  paginatedCars: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 12;
  totalPages: number = 0;
  searchQuery: string = ''; 

  constructor(private _ApiService: ApiService, private _Router: Router) {}

  ngOnInit(): void {
    this._ApiService.getAllCars().subscribe({
      next: (response) => {
        this.allCars = response;
        this.filterCars();
      },
      error: (err) => console.log(err),
    });
  }

  filterCars(): void {
    this.filteredCars = this.allCars.filter(car => 
      car.make.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      car.model.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalPages = Math.ceil(this.filteredCars.length / this.itemsPerPage);
    this.currentPage = 1; 
    this.updatePaginatedCars();
  }

  updatePaginatedCars(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCars = this.filteredCars.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedCars();
    }
  }

  get paginationButtons(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.filterCars(); 
  }
}
