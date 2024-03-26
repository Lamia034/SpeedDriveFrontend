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
import {Rent} from "../models/interfaces/Rent";

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit{
  carRentId: any ;
  carDetails: CarForRentResponse | undefined;
minDateTime:string;
startDateRented: any ;
endDateRented: any;
  maxDateTime: string;
  disabledDates: string[] = [];

rents:Rent[]= [];
  rentedDates: Date[] = [];

  showAddRentForm = false;
  AddRentForm!: FormGroup;



  constructor(
    private route: ActivatedRoute,
    private feedsService: FeedsService,
    private rentsService: RentsService,
    private formBuilder: FormBuilder,

  ) {
    const today = new Date();
    this.minDateTime = this.formatDateTime(today);

    this.maxDateTime = this.formatDateTime(new Date(today.getFullYear() + 1, today.getMonth(), today.getDate()));
    const bookings = [
      { startDate: '2024-03-21T10:00', endDate: '2024-03-22T16:00' },
      { startDate: '2024-03-25T14:00', endDate: '2024-03-26T12:00' },
    ];

    this.disabledDates = this.getDisabledDates(bookings);

  }

  private getDisabledDates(bookings: { startDate: string; endDate: string }[]): string[] {
    const disabledDates: string[] = [];

    bookings.forEach((booking) => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      const currentDate = new Date(start);
      while (currentDate <= end) {
        const disabledDate = this.formatDateTime(currentDate);
        disabledDates.push(disabledDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return disabledDates;
  }

  private formatDateTime(date: Date): string {
    // Format date and time as 'YYYY-MM-DDTHH:MM'
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // const carRentId = params.get('carRentId');

      // @ts-ignore
      this.carRentId = +params.get('carRentId');
      this.fetchCarDetails();
    });


    this.AddRentForm = this.formBuilder.group({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl( '',Validators.required),
      agencyId:new FormControl('')
    });





  }



  fetchCarDetails(): void {
    this.feedsService.getCarForRentById(this.carRentId).subscribe(
      (data:  CarForRentResponse) => {
        this.carDetails = data;
        console.log("car details:" ,this.carDetails);
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
      const agencyId =this.carDetails?.agencyId;

      const addedRent: RentRequest = {
        clientId: LoggedClientId,
        // @ts-ignore
        carRentId: carRentId,
        startDate: startDate,
        endDate: endDate,
        agencyId:agencyId,
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
    return isoString.slice(0, 16);
  }


}
