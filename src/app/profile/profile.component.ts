import {Component, OnInit} from '@angular/core';
import {Rent} from "../models/interfaces/Rent";
import {RentsService} from "../services/RentsService";
import {FormBuilder} from "@angular/forms";
import {SharedService} from "../shared.service";
import {CarForRent, FuelType} from "../models/interfaces/carforrent";
import {FeedsService} from "../services/FeedsService";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{


  pages: number[] = [];
  currentPage = 0;
  pageSize = 3;
  types: string[] = Object.values(FuelType);
  rents: Rent[] = [];
  accessionDate = new Date();
  carsForRent: CarForRent[] = [];

  constructor(
    private rentsService: RentsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public sharedService: SharedService
  ) {}

  ngOnInit() {
    this.fetchPage(0);

    const isRentsRoute = this.route.snapshot.url[0]?.path === 'rents';
    if (isRentsRoute) {
      // this.fetchFeeds();
      this.fetchRents(this.currentPage, this.pageSize);
    }
  }

  fetchRents(page: number, size: number): void {
    this.rentsService.getRentsByClient(page, size).subscribe(
      (data: Rent[]) => {
        this.rents = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching rents:', error);
      }
    );
  }

  // cancelRent(clientId: string, carRentId: number | undefined): void {
  //   console.log("khl",clientId,carRentId)
  //   this.rentsService.deleteRent(clientId, carRentId).subscribe(
  //     () => {
  //       this.fetchRents(this.currentPage, this.pageSize);
  //     },
  //     error => console.error('Error deleting rent:', error)
  //   );
  // }


  cancelRent(clientId: string, carRentId: number | undefined): void {
    console.log("khl",clientId,carRentId);
    this.rentsService.deleteRent(clientId, carRentId).subscribe(
      () => {
        this.fetchRents(this.currentPage, this.pageSize);
      },
      error => {
        console.error('Error deleting rent:', error);
        if (error.status === 500) {
          Swal.fire({
            title: 'Error',
            text: 'You cannot delete this rent as the current time is within the rental period.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      }
    );
  }
  fetchPage(page: number): void {
    this.rentsService.getRentsByClient(page, this.pageSize).subscribe(
      (rents: Rent[]) => {
        this.rents = rents;
        this.currentPage = page;
        this.generatePageNumbers();
      },
      (error: any) => {
        console.error('Error fetching rents:', error);
      }
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
