import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";

import {Rent} from "../models/interfaces/Rent";
import {RentsService} from "../services/RentsService";
import {Observable} from "rxjs";
import {CarForRent, CarStatus} from "../models/interfaces/carforrent";
import {CarService} from "../services/CarService";
import {DashboardComponent} from "../dashboard/dashboard.component";
@Component({
  selector: 'app-rentsbyagency',
  templateUrl: './rentsbyagency.component.html',
  styleUrls: ['./rentsbyagency.component.css']
})
export class RentsbyagencyComponent implements OnInit{
  rents: Rent[] = [];
  pages: number[] = [];
  currentPage = 0;
  pageSize = 9;
carRentId:any;
  carsForRent: CarForRent[] = [];

  constructor(private dashboardComponent : DashboardComponent,private carService: CarService , private rentService: RentsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.refreshRents();


  }


  updateCarStatus(carRentId: any) {
    console.log("entered to update status");
    this.carService.getCarForRentById(carRentId).subscribe(
      (carForRent: CarForRent) => {
        console.log("the car ", carForRent);

        if (carForRent) {
          carForRent.carStatus = CarStatus.AVAILABLE;

          this.carService.updateCarForRent(carRentId, carForRent).subscribe(
            (response) => {
              console.log("response",response)
              console.log('Car status updated successfully');
            },
            (error) => {
              console.error('Error updating car status:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error retrieving car for rent:', error);
      }
    );
  }
  // updateCarRent(carRentId:any) {
  //   console.log("enter");
  //   this.isUpdateCarRentMode = true;
  //
  //   this.selectedCarRentId = carRentId;
  //   const carForRent = this.carsForRent.find(a => a.carRentId === carRentId);
  //   console.log(carForRent);
  //   if (carForRent) {
  //     this.updateCarRentForm.patchValue({
  //       make: carForRent.make,
  //       model: carForRent.model,
  //       manifacturingYear: carForRent.manifacturingYear,
  //       fuel: carForRent.fuel,
  //       rentalPrice: carForRent.rentalPrice,
  //       imagePath: carForRent.imagePath
  //
  //     });
  //   }
  //   console.log(carForRent);
  // }
  //
  // cancelUpdate() {
  //   this.isUpdateCarRentMode = false;
  //   this.updateCarRentForm.reset();
  // }
  //
  // submitCarRentUpdate() {
  //   console.log(this.selectedCarRentId);
  //
  //   if (this.updateCarRentForm.valid) {
  //     console.log("after");
  //     const make = this.updateCarRentForm.value.make;
  //     const model = this.updateCarRentForm.value.model;
  //     const manifacturingYear = this.updateCarRentForm.value.manifacturingYear;
  //     const fuel = this.updateCarRentForm.value.fuel;
  //     const rentalPrice = this.updateCarRentForm.value.rentalPrice;
  //     const imagePath =  this.imageURL
  //
  //
  //     const updatedCarForRent = {
  //       make: make,
  //       model: model,
  //       manifacturingYear: manifacturingYear,
  //       fuel: fuel,
  //       rentalPrice: rentalPrice,
  //       imagePath: imagePath
  //     };
  //     console.log("here");
  //
  //     this.carService.updateCarForRent(this.selectedCarRentId, updatedCarForRent).subscribe(
  //       (response) => {
  //         console.log('Car updated successfully');
  //         this.cancelUpdate();
  //         this.refreshCars();
  //         console.log("fetched?");
  //       },
  //       (error) => {
  //         console.error('Error updating competition:', error);
  //       }
  //     );
  //
  //   }
  // }



  private refreshRents(): void {
    this.rentService.getRentsByAgency(  this.currentPage, this.pageSize ).subscribe(
      rents => this.rents = rents,
      error => console.error('Error fetching rents:', error)
    );
  }

  fetchPage(page: number): void {
    console.log('Enter fetch page');
    this.rentService.getRentsByAgency(page, this.pageSize).subscribe(
      rentsForRent => {
        this.rents = rentsForRent;
        this.currentPage = page;
        this.generatePageNumbers();
      },
      error => console.error('Error fetching rents for rent:', error)
    );
  }

  generatePageNumbers(): void {
    this.pages = Array.from({ length: 10 }, (_, i) => i + 1);
  }

  loadPage(page: number): void {
    this.fetchPage(page - 1);
    this.currentPage = page;
  }

}
