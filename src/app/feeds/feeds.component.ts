import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, } from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CarForRent, FuelType} from "../models/interfaces/carforrent";
import {ActivatedRoute, Router} from "@angular/router";
import {FeedsService} from "../services/FeedsService";

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})


export class FeedsComponent implements OnInit {
  pages: number[] = [];
  currentPage = 0;
  pageSize = 6;
  types: string[] = Object.values(FuelType);
  feeds: CarForRent[] = [];
  accessionDate = new Date();
  carsForRent: CarForRent[] = [];

  constructor(
    private feedsService: FeedsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchPage(0);

    const isFeedsRoute = this.route.snapshot.url[0]?.path === 'feeds';
    if (isFeedsRoute) {
      // this.fetchFeeds();
      this.fetchFeeds(this.currentPage, this.pageSize);
    }
  }

  fetchFeeds(page: number, size: number): void {
    this.feedsService.getAllCarsForRent(page, size).subscribe(
      (data: CarForRent[]) => {
        this.feeds = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching feeds:', error);
      }
    );
  }

  fetchPage(page: number): void {
    this.feedsService.getAllCarsForRent(page, this.pageSize).subscribe(
      (feeds: CarForRent[]) => {
        this.feeds = feeds;
        this.currentPage = page;
        this.generatePageNumbers();
      },
      (error: any) => {
        console.error('Error fetching feeds:', error);
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

  // private refreshCars(): void {
  //   this.feedsService.getAllCarsForRent(  this.currentPage, this.pageSize ).subscribe(
  //     carsForRent => this.carsForRent = carsForRent,
  //     error => console.error('Error fetching cars for rent:', error)
  //   );
  // }
}

