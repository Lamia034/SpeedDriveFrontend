import {Component, OnInit} from '@angular/core';
import {CarService} from "../services/CarService";
import {ActivatedRoute} from "@angular/router";
import {FeedsService} from "../services/FeedsService";
import Swal from 'sweetalert2';

import {CarForRent} from "../models/interfaces/carforrent";
import {CarForRentResponse} from "../models/responses/CarForRentResponse";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RentsService} from "../services/RentsService";
import {RentRequest} from "../models/raquests/RentRequest";
import {RentResponse} from "../models/responses/RentResponse";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit{
  carRentId: any ;
  carDetails: CarForRentResponse | undefined;

  showAddRentForm = false;
  AddRentForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private feedsService: FeedsService,
    private rentsService: RentsService,
    private formBuilder: FormBuilder,

  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // const carRentId = params.get('carRentId');

      // @ts-ignore
      this.carRentId = +params.get('carRentId');
      this.fetchCarDetails();
    });


    this.AddRentForm = this.formBuilder.group({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl( '',Validators.required)

    });
  }

  fetchCarDetails(): void {
    this.feedsService.getCarForRentById(this.carRentId).subscribe(
      (data:  CarForRentResponse) => {
        this.carDetails = data;
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    );
  }


  cancelAdd(): void {
    console.log('Cancelling add...');
    this.AddRentForm.reset();
    this.showAddRentForm = false;
  }

  submitNewRent() {
    console.log('Submit new rent method called');
    if (this.AddRentForm.valid) {
      const startDate = this.formatDate(this.AddRentForm.value.startDate);
      const endDate = this.formatDate(this.AddRentForm.value.endDate);
      const LoggedClientId = localStorage.getItem('clientId') || '';
      const carRentId = this.carDetails?.carRentId;


      const addedRent: RentRequest = {
        clientId: LoggedClientId,
        // @ts-ignore
        carRentId: carRentId,
        startDate: startDate,
        endDate: endDate,
      };
      console.log(addedRent);

      this.rentsService.addRent(addedRent).subscribe(
        (response: RentResponse) => {
          console.log('Rent added successfully:', response);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'You successfully rented the car!'
          });
          this.cancelAdd();
          this.fetchCarDetails();
        },
        (error) => {
          console.error('Error renting car:', error);
          let errorMessage = 'Error renting car, please try again!';
          if (error.status === 400 && error.error) {
            errorMessage = error.error.message || errorMessage;
          }
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage
          });
        }
      );
    }
  }
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    return isoString.slice(0, 16); // Remove seconds and milliseconds
  }
  // submitNewRent() {
  //   console.log('Submit new rent method called');
  //   if (this.AddRentForm.valid) {
  //     const startDate = this.formatDate(this.AddRentForm.value.startDate);
  //     const endDate = this.formatDate(this.AddRentForm.value.endDate);
  //     const LoggedClientId = localStorage.getItem('clientId') || '';
  //     const carRentId = this.carDetails?.carRentId ;
  //
  //
  //     const addedRent: RentRequest = {
  //
  //         clientId: LoggedClientId,
  //
  //       // @ts-ignore
  //         carRentId: carRentId,
  //
  //       startDate:startDate,
  //       endDate:endDate,
  //     };
  //     console.log(addedRent);
  //
  //     this.rentsService.addRent(addedRent).subscribe(
  //       () => {
  //         console.log('You successfully Rent the car!');
  //         Swal.fire({
  //           icon: 'success',
  //           title: 'Success!',
  //           text: 'You successfully Rent the car!!'
  //         });
  //         this.cancelAdd();
  //         this.fetchCarDetails();
  //       },
  //       (error: { status: number; error: { date: any; amount: any; }; }) => {
  //         console.error('Error renting car:', error);
  //         if (error.status === 400 && error.error) {
  //           let errorMessages = '';
  //
  //           if (error.error.date) {
  //             errorMessages += `<strong>Date:</strong> ${error.error.date}<br>`;
  //           }
  //           if (error.error.amount) {
  //             errorMessages += `<strong>Amount:</strong> ${error.error.amount}<br>`;
  //           }
  //
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Validation Error',
  //             html: errorMessages || 'Error renting car, please try again!'
  //           });
  //         }
  //       }
  //     );
  //   }
  // }

}
