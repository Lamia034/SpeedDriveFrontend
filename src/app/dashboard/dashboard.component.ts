import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CarForRent, FuelType} from "../models/interfaces/carforrent";
import {CarForSell} from "../models/interfaces/carforsell";
import {CarService} from "../services/CarService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  showAddCarForRentForm = false;
  carRentAddForm!: FormGroup;
  carsForRent: CarForRent[] = [];
  pages: number[] = [];
  currentPage = 0;
  pageSize = 9;
  newCar: any = {};
  fuels: string[] = Object.values(FuelType);
  isUpdateCarRentMode: boolean = false;
  updateCarRentForm!: FormGroup;
  selectedCarRentId: any;
  carsForSell: CarForSell[] | undefined;
   imageURL: string | null = null;
  constructor(private carService: CarService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.refreshCars();
    this.carRentAddForm = this.formBuilder.group({
      makeNew: new FormControl('', Validators.required),
      manifacturingYearNew: new FormControl('', Validators.required),
      modelNew: new FormControl('', Validators.required),
      fuelNew: new FormControl('',Validators.required),
      rentalPriceNew: new FormControl('', Validators.required),
      imageNew: new FormControl('', Validators.required)

    });
    this.updateCarRentForm = this.formBuilder.group({
      make: [ Validators.required, Validators.min(0)],
      model: [ Validators.required],
      manifacturingYear: [Validators.required],
      fuel: [Validators.required],
      rentalPrice: ['', Validators.required],
      imagePath: new FormControl('', Validators.required)

    });
  }








  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.carRentAddForm.patchValue({
          imageNew: imageUrl
        });

      };
      reader.readAsDataURL(file);
    }
  }

  onUpdateImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const imageUrl = e.target.result;
        this.updateCarRentForm.patchValue({
          imagePath: imageUrl
        });
      };
      reader.readAsDataURL(file);
    }
  }


  submitNewCar(): void {
    if (this.carRentAddForm.valid) {
      const { makeNew, manifacturingYearNew, modelNew, fuelNew, rentalPriceNew, imageNew } = this.carRentAddForm.value;
      const LoggedAgencyId = localStorage.getItem('agencyId') || '';

      const newCar: CarForRent = {
        make: makeNew,
        manifacturingYear: manifacturingYearNew,
        model: modelNew,
        fuel: fuelNew,
        rentalPrice: rentalPriceNew,
        imagePath: imageNew,

        agencyId: LoggedAgencyId
      };

      this.carService.addCarForRent(newCar).subscribe(
        response => {
          console.log('Car added successfully:', response);
          this.refreshCars();
          this.cancelAdd();
        },
        error => {
          console.error('Failed to add car:', error);
        }
      );
    }
  }





  cancelAdd(): void {
    console.log('Cancelling add...');
    this.carRentAddForm.reset();
    this.showAddCarForRentForm = false;
  }


  updateCarRent(carRentId:any) {
    console.log("enter");
    this.isUpdateCarRentMode = true;

    this.selectedCarRentId = carRentId;
    const carForRent = this.carsForRent.find(a => a.carRentId === carRentId);
    console.log(carForRent);
    if (carForRent) {
      this.updateCarRentForm.patchValue({
        make: carForRent.make,
        model: carForRent.model,
        manifacturingYear: carForRent.manifacturingYear,
        fuel: carForRent.fuel,
        rentalPrice: carForRent.rentalPrice,
        imagePath: carForRent.imagePath

      });
    }
    console.log(carForRent);
  }

  cancelUpdate() {
    this.isUpdateCarRentMode = false;
    this.updateCarRentForm.reset();
  }

  submitCarRentUpdate() {
    console.log(this.selectedCarRentId);

      if (this.updateCarRentForm.valid) {
        console.log("after");
        const make = this.updateCarRentForm.value.make;
        const model = this.updateCarRentForm.value.model;
        const manifacturingYear = this.updateCarRentForm.value.manifacturingYear;
        const fuel = this.updateCarRentForm.value.fuel;
        const rentalPrice = this.updateCarRentForm.value.rentalPrice;
        const imagePath = this.updateCarRentForm.value.imagePath;

        const updatedCarForRent = {
          make: make,
          model: model,
          manifacturingYear: manifacturingYear,
          fuel: fuel,
          rentalPrice: rentalPrice,
          imagePath: imagePath
        };
        console.log("here");

        this.carService.updateCarForRent(this.selectedCarRentId, updatedCarForRent).subscribe(
          (response) => {
            console.log('Car updated successfully');
            this.cancelUpdate();
            this.refreshCars();
            console.log("fetched?");
          },
          (error) => {
            console.error('Error updating competition:', error);
          }
        );

    }
  }

  deleteCarForRent(carRentId: any) {
    this.carService.deleteCarForRent(carRentId).subscribe({
      next: () => {
        console.log('Car deleted successfully');
        window.location.reload();
      },
      error: (error) => {
        console.error('Error deleting Car:', error);
      }
    });
  }

  private refreshCars(): void {
    this.carService.getCarsForRentByAgency(  this.currentPage, this.pageSize ).subscribe(
      cars => this.carsForRent = cars,
      error => console.error('Error fetching cars for rent:', error)
    );
  }

  fetchPage(page: number): void {
    console.log('Enter fetch page');
    this.carService.getCarsForRentByAgency(page, this.pageSize).subscribe(
      carsForRent => {
        this.carsForRent = carsForRent;
        this.currentPage = page;
        this.generatePageNumbers();
      },
      error => console.error('Error fetching cars for rent:', error)
    );
  }

  generatePageNumbers(): void {
    this.pages = Array.from({ length: 10 }, (_, i) => i + 1);
  }

  loadPage(page: number): void {
    this.fetchPage(page - 1);
    this.currentPage = page;
  }

  // submitNewCar(): void {
  //   if (this.carRentAddForm.valid) {
  //     const { makeNew, manufacturingYearNew, modelNew, fuelNew, rentalPriceNew, imageNew } = this.carRentAddForm.value; // Corrected variable name
  //
  //     const LoggedAgencyId = localStorage.getItem('agencyId') || '';
  //
  //     const formData = new FormData();
  //     formData.append('make', makeNew);
  //     formData.append('manufacturingYear', manufacturingYearNew); // Corrected variable name
  //     formData.append('model', modelNew);
  //     formData.append('fuel', fuelNew);
  //     formData.append('rentalPrice', rentalPriceNew);
  //     formData.append('image', imageNew); // Corrected variable name
  //
  //     formData.append('agencyId', LoggedAgencyId);
  //
  //     this.carService.addCarForRent(formData).subscribe(
  //       response => {
  //         console.log('Car added successfully:', response);
  //         this.refreshCars();
  //         this.carRentAddForm.reset();
  //       },
  //       error => {
  //         console.error('Failed to add car:', error);
  //       }
  //     );
  //   }
  // }
  // onImageChange(event: Event): void {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0) {
  //     this.selectedImage = inputElement.files[0];
  //     this.carRentAddForm.patchValue({
  //       imageNew: this.selectedImage,
  //     });
  //   }
  // }

  // submitNewCar(): void {
  //   if (this.carRentAddForm.valid) {
  //     const { makeNew, manifacturingYearNew, modelNew, fuelNew, rentalPriceNew } = this.carRentAddForm.value;
  //     const LoggedAgencyId = localStorage.getItem('agencyId') || '';
  //
  //     const formData = new FormData();
  //     formData.append('makeNew', makeNew);
  //     formData.append('manifacturingYearNew', manifacturingYearNew);
  //     formData.append('modelNew', modelNew);
  //     formData.append('fuelNew', fuelNew);
  //     formData.append('rentalPriceNew', rentalPriceNew);
  //     formData.append('agencyId', LoggedAgencyId);
  //     formData.append('imageNew', this.carRentAddForm.get('imageNew')?.value);
  //
  //     this.carService.addCarForRent(formData).subscribe(
  //       response => {
  //         console.log('Car added successfully:', response);
  //         this.refreshCars();
  //         this.carRentAddForm.reset();
  //       },
  //       error => {
  //         console.error('Failed to add car:', error);
  //       }
  //     );
  //   }
  // }
  // submitNewCar(): void {
  //   if (this.carRentAddForm.valid) {
  //     const { makeNew, manifacturingYearNew, modelNew, fuelNew, rentalPriceNew ,selectedImage } = this.carRentAddForm.value;
  //     const LoggedAgencyId = localStorage.getItem('agencyId') || '';
  //     //ts-ignore
  //     const newCar: CarForRent = {
  //       make: makeNew,
  //       manifacturingYear: manifacturingYearNew,
  //       model: modelNew,
  //       fuel: fuelNew,
  //       rentalPrice: rentalPriceNew,
  //        image :selectedImage,
  //
  //       agencyId:LoggedAgencyId
  //     };
  //
  //     this.carService.addCarForRent(newCar).subscribe(
  //       response => {
  //         console.log('Car added successfully:', response);
  //         this.refreshCars();
  //         this.carRentAddForm.reset();
  //       },
  //       error => {
  //         console.error('Failed to add car:', error);
  //       }
  //     );
  //   }
  // }
}
